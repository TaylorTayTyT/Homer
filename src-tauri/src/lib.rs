// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[tauri::command]
fn get_book_parts() -> Vec<String> {
    use std::fs; 
    let paths = fs::read_dir("./src/story").unwrap();
    let mut paths_string = vec![];
    for path in paths{
        paths_string.push(path.unwrap().path().display().to_string().clone());
    }
    paths_string
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_book_parts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
