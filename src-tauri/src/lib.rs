// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::{fs::{self}, path, vec};
use walkdir::WalkDir;
use serde_json::{Map, Value};
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
#[tauri::command]
fn recursive_directory_traversal() -> Value {
    let start_dir = "./src/Homer";
    let mut directory_tree: Map<String, Value> = Map::new();

    for entry in WalkDir::new(start_dir).into_iter().filter_map(|e| e.ok()) {
        if let Some(path_str) = entry.path().to_str() {
            let path_components: Vec<&str> = path_str
                .split(std::path::MAIN_SEPARATOR.to_string().as_str())
                .collect();

            // Insert the path into the directory tree
            insert_into_tree(&mut directory_tree, &path_components, entry.path().is_file());
        }
    }

    Value::Object(directory_tree)
}

#[tauri::command]
fn insert_into_file(content: String, path: Vec<&str>) -> Result<(), String> {
    let mut valid_path = vec!["src", "Homer"];
    valid_path.extend(path.clone());

    // Convert the path to a single string
    let file_path = valid_path.join(&path::MAIN_SEPARATOR.to_string());

    // Attempt to write the file and handle errors
    if let Err(err) = std::fs::write(&file_path, content) {
        return Err(format!("Failed to write file: {}", err));
    }

    Ok(())

    //TODO: remove the Homer shit from the watch files
}

#[tauri::command]
fn read_from_file(path: Vec<&str>) -> String{
    let mut valid_path = vec!["src", "Homer"];
    valid_path.extend(path.clone());
    let contents = fs::read_to_string(valid_path.join(path::MAIN_SEPARATOR_STR)).expect("reading file problem");
    return contents
}

/// Recursively inserts files and directories into the tree structure
fn insert_into_tree(
    tree: &mut Map<String, Value>, 
    path_components: &[&str], 
    is_file: bool,
) {
    if path_components.is_empty() {
        return;
    }

    let current = path_components[0];
    if path_components.len() == 1 {
        if is_file {
            // Add the file to the current directory
            tree.entry(current.to_string())
                .or_insert_with(|| Value::String(current.to_string()));
        }
    } else {
        // Create or retrieve the subdirectory
        let subtree = tree
            .entry(current.to_string())
            .and_modify(|value| {
                if !value.is_object() {
                    *value = Value::Object(Map::new());
                }
            })
            .or_insert_with(|| Value::Object(Map::new()))
            .as_object_mut()
            .unwrap();

        insert_into_tree(subtree, &path_components[1..], is_file);
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_book_parts, recursive_directory_traversal, insert_into_file, read_from_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
