# ============================================================
# Stage 1: Build EnvGuppy (Linux AppImage + deb)
# ============================================================
FROM ubuntu:22.04 AS builder

ENV DEBIAN_FRONTEND=noninteractive

# System dependencies for Tauri v2 on Linux
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    wget \
    file \
    pkg-config \
    libwebkit2gtk-4.1-dev \
    libgtk-3-dev \
    libappindicator3-dev \
    librsvg2-dev \
    libssl-dev \
    patchelf \
    libfuse2 \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /app

# Cache Rust dependencies: copy manifests first, build a dummy to warm cache
COPY src-tauri/Cargo.toml src-tauri/Cargo.lock* src-tauri/
COPY src-tauri/build.rs src-tauri/
RUN mkdir -p src-tauri/src && \
    echo 'fn main() {}' > src-tauri/src/main.rs && \
    echo 'pub fn run() {}' > src-tauri/src/lib.rs && \
    cd src-tauri && cargo fetch

# Cache npm dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the full source
COPY . .

# Build the frontend
RUN npm run build

# Build Tauri for Linux (AppImage + deb)
RUN cd src-tauri && cargo build --release

# Use tauri CLI to bundle
RUN npx tauri build --bundles deb,appimage || true

# ============================================================
# Stage 2: Minimal runtime image for running the GUI
# ============================================================
FROM ubuntu:22.04 AS runtime

ENV DEBIAN_FRONTEND=noninteractive

# Minimal runtime dependencies for WebKit2GTK + GTK3
RUN apt-get update && apt-get install -y --no-install-recommends \
    libwebkit2gtk-4.1-0 \
    libgtk-3-0 \
    libappindicator3-1 \
    librsvg2-2 \
    libfuse2 \
    # Package managers the app can invoke at runtime
    apt-utils \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -ms /bin/bash guppy
USER guppy
WORKDIR /home/guppy

# Copy the compiled binary from builder
COPY --from=builder --chown=guppy:guppy /app/src-tauri/target/release/envguppy /usr/local/bin/envguppy

# Copy bundled artifacts to an output directory (useful for extracting)
COPY --from=builder --chown=guppy:guppy /app/src-tauri/target/release/bundle /home/guppy/artifacts

# Default repos directory
RUN mkdir -p /home/guppy/repos

ENTRYPOINT ["envguppy"]
