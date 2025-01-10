// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::collections::HashMap;
use std::fs::{self, DirEntry};
use std::{string, vec}; 
use walkdir::WalkDir;
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[tauri::command]
fn get_book_parts() -> Vec<String> {
    let paths = fs::read_dir("./src/Homer").unwrap();
    let mut paths_string = vec![];
    for path in paths{
        paths_string.push(path.unwrap().path().display().to_string().clone());
    }
    paths_string
}
pub fn recursive_directory_traversal() -> Vec<&Vec<&str>>{
    let start_dir = "./src/Homer";
    let mut file_contents: Vec<&Vec<&str>> = vec![];
    for entry in WalkDir::new(start_dir).into_iter().filter_map(|e| e.ok()) {
        // Print the path of each entry
        let mut string_vec: Vec<&str> = vec![];
        let revised_entry: Vec<&str> = entry.path().to_str().unwrap().split("\\").collect();
        let desired_str: Vec<&str> = revised_entry.splice(1.., []).collect();

        if(entry.path().is_file()){
            file_contents.push(&desired_str);
        }
    file_contents
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_book_parts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
