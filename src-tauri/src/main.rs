#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

use tauri::{Manager, WindowEvent};
use window_ext::WindowExt;
use std::fs;
use std::path::Path;
use dirs;

mod window_ext;

#[tauri::command]
async fn read_file(path: &str) -> Result<String, String> {
    println!("Reading file: {}", path);
    match fs::read_to_string(path) {
        Ok(contents) => Ok(contents),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
async fn write_file(path: &str, contents: &str) -> Result<String, String> {
    println!("Writing file: {}", path);
    match fs::create_dir_all(Path::new(path).parent().unwrap()) {
        Ok(_) => (),
        Err(error) => return Err(error.to_string()),
    }
    match fs::write(path, contents) {
        Ok(_) => Ok("Success writing file".to_string()),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
async fn read_dir(path: std::path::PathBuf) -> Vec<String> {
    let mut file_names = Vec::new();
    for entry in fs::read_dir(path).unwrap() {
        let entry = entry.unwrap();
        let file_name = entry.file_name().into_string().unwrap();
        file_names.push(file_name);
    }
    file_names
}

// delete directory
#[tauri::command]
async fn remove_dir(path: std::path::PathBuf) -> Result<String, String> {
    match fs::remove_dir_all(path) {
        Ok(_) => Ok("Success deleting directory".to_string()),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
async fn exists(path: std::path::PathBuf) -> bool {
    Path::new(&path).exists()
}

#[tauri::command]
async fn get_home_dir() -> String {
    dirs::home_dir().unwrap().to_str().unwrap().to_string()
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let win = app.get_window("main").unwrap();
            win.set_transparent_titlebar(true);
            win.position_traffic_lights(20.0, 20.0);
            Ok(())
        })
        .on_window_event(|e| {
            if let WindowEvent::Resized(..) = e.event() {
                let win = e.window();
                win.position_traffic_lights(20., 20.);
            }
        })
        .invoke_handler(tauri::generate_handler![read_file, write_file, get_home_dir, read_dir, remove_dir, exists])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

}