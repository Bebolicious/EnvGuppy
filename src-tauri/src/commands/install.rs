use serde::Serialize;
use std::process::Command;

#[derive(Serialize, Clone)]
pub struct InstallResult {
    pub package_id: String,
    pub success: bool,
    pub message: String,
    pub skipped: bool,
}

fn run_winget_install(identifier: &str) -> Result<String, String> {
    let output = Command::new("winget")
        .args([
            "install",
            "--id",
            identifier,
            "--accept-package-agreements",
            "--accept-source-agreements",
            "-e",
            "--silent",
        ])
        .output()
        .map_err(|e| format!("Failed to execute winget: {}", e))?;

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).to_string();

    if output.status.success() || stdout.contains("Successfully installed") || stdout.contains("already installed") {
        Ok(stdout)
    } else {
        Err(format!("{}\n{}", stdout, stderr))
    }
}

fn run_choco_install(identifier: &str) -> Result<String, String> {
    let output = Command::new("choco")
        .args(["install", identifier, "-y", "--no-progress"])
        .output()
        .map_err(|e| format!("Failed to execute choco: {}", e))?;

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).to_string();

    if output.status.success() {
        Ok(stdout)
    } else {
        Err(format!("{}\n{}", stdout, stderr))
    }
}

fn run_scoop_install(identifier: &str) -> Result<String, String> {
    let output = Command::new("scoop")
        .args(["install", identifier])
        .output()
        .map_err(|e| format!("Failed to execute scoop: {}", e))?;

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).to_string();

    if output.status.success() {
        Ok(stdout)
    } else {
        Err(format!("{}\n{}", stdout, stderr))
    }
}

fn run_apt_install(identifier: &str) -> Result<String, String> {
    let output = Command::new("sudo")
        .args(["apt", "install", "-y", identifier])
        .output()
        .map_err(|e| format!("Failed to execute apt: {}", e))?;

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).to_string();

    if output.status.success() {
        Ok(stdout)
    } else {
        Err(format!("{}\n{}", stdout, stderr))
    }
}

fn run_brew_install(identifier: &str) -> Result<String, String> {
    let is_cask = identifier.starts_with("--cask ");
    let actual_id = if is_cask {
        identifier.trim_start_matches("--cask ")
    } else {
        identifier
    };

    let mut args = vec!["install"];
    if is_cask {
        args.push("--cask");
    }
    args.push(actual_id);

    let output = Command::new("brew")
        .args(&args)
        .output()
        .map_err(|e| format!("Failed to execute brew: {}", e))?;

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).to_string();

    if output.status.success() {
        Ok(stdout)
    } else {
        Err(format!("{}\n{}", stdout, stderr))
    }
}

#[tauri::command]
pub async fn install_package(
    package_id: String,
    manager: String,
    identifier: String,
) -> Result<InstallResult, String> {
    let result = match manager.as_str() {
        "winget" => run_winget_install(&identifier),
        "choco" => run_choco_install(&identifier),
        "scoop" => run_scoop_install(&identifier),
        "apt" => run_apt_install(&identifier),
        "brew" => run_brew_install(&identifier),
        _ => Err(format!("Unsupported package manager: {}", manager)),
    };

    match result {
        Ok(msg) => Ok(InstallResult {
            package_id,
            success: true,
            message: msg,
            skipped: false,
        }),
        Err(msg) => Ok(InstallResult {
            package_id,
            success: false,
            message: msg,
            skipped: false,
        }),
    }
}

#[tauri::command]
pub async fn clone_repo(url: String, path: String) -> Result<InstallResult, String> {
    let output = Command::new("git")
        .args(["clone", &url, &path])
        .output()
        .map_err(|e| format!("Failed to execute git clone: {}", e))?;

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).to_string();

    if output.status.success() {
        Ok(InstallResult {
            package_id: url.clone(),
            success: true,
            message: format!("Cloned {} to {}", url, path),
            skipped: false,
        })
    } else {
        Ok(InstallResult {
            package_id: url.clone(),
            success: false,
            message: format!("{}\n{}", stdout, stderr),
            skipped: false,
        })
    }
}
