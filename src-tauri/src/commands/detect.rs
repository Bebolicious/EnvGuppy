use serde::Serialize;
use std::process::Command;

#[derive(Serialize, Clone)]
pub struct PlatformInfo {
    pub os: String,
    pub package_managers: Vec<String>,
}

fn command_exists(cmd: &str) -> bool {
    which::which(cmd).is_ok()
}

#[cfg(target_os = "windows")]
fn detect_winget() -> bool {
    Command::new("winget")
        .arg("--version")
        .output()
        .map(|o| o.status.success())
        .unwrap_or(false)
}

#[cfg(not(target_os = "windows"))]
fn detect_winget() -> bool {
    false
}

#[tauri::command]
pub async fn get_platform_info() -> Result<PlatformInfo, String> {
    let os = if cfg!(target_os = "windows") {
        "windows"
    } else if cfg!(target_os = "linux") {
        "linux"
    } else if cfg!(target_os = "macos") {
        "macos"
    } else {
        "unknown"
    };

    let mut managers = Vec::new();

    #[cfg(target_os = "windows")]
    {
        if detect_winget() {
            managers.push("winget".to_string());
        }
        if command_exists("choco") {
            managers.push("choco".to_string());
        }
        if command_exists("scoop") {
            managers.push("scoop".to_string());
        }
    }

    #[cfg(target_os = "linux")]
    {
        if command_exists("apt") {
            managers.push("apt".to_string());
        }
        if command_exists("snap") {
            managers.push("snap".to_string());
        }
    }

    #[cfg(target_os = "macos")]
    {
        if command_exists("brew") {
            managers.push("brew".to_string());
        }
    }

    Ok(PlatformInfo {
        os: os.to_string(),
        package_managers: managers,
    })
}

#[tauri::command]
pub async fn check_command_exists(command: String) -> Result<bool, String> {
    Ok(command_exists(&command))
}

#[tauri::command]
pub async fn scan_installed_winget() -> Result<Vec<String>, String> {
    #[cfg(target_os = "windows")]
    {
        let output = Command::new("winget")
            .args(["list", "--disable-interactivity", "--accept-source-agreements"])
            .output()
            .map_err(|e| format!("Failed to run winget list: {}", e))?;

        let stdout = String::from_utf8_lossy(&output.stdout).to_string();
        Ok(vec![stdout])
    }

    #[cfg(not(target_os = "windows"))]
    {
        Ok(vec![])
    }
}

#[tauri::command]
pub async fn scan_installed_brew() -> Result<Vec<String>, String> {
    #[cfg(target_os = "macos")]
    {
        let output = Command::new("brew")
            .args(["list", "--formula", "-1"])
            .output()
            .map_err(|e| format!("Failed to run brew list: {}", e))?;

        let stdout = String::from_utf8_lossy(&output.stdout);
        let packages: Vec<String> = stdout.lines().map(|l| l.to_string()).collect();
        Ok(packages)
    }

    #[cfg(not(target_os = "macos"))]
    {
        Ok(vec![])
    }
}

#[tauri::command]
pub async fn scan_installed_apt() -> Result<Vec<String>, String> {
    #[cfg(target_os = "linux")]
    {
        let output = Command::new("dpkg")
            .args(["--get-selections"])
            .output()
            .map_err(|e| format!("Failed to run dpkg: {}", e))?;

        let stdout = String::from_utf8_lossy(&output.stdout);
        let packages: Vec<String> = stdout
            .lines()
            .filter_map(|l| {
                let parts: Vec<&str> = l.split_whitespace().collect();
                if parts.len() >= 2 && parts[1] == "install" {
                    Some(parts[0].to_string())
                } else {
                    None
                }
            })
            .collect();
        Ok(packages)
    }

    #[cfg(not(target_os = "linux"))]
    {
        Ok(vec![])
    }
}
