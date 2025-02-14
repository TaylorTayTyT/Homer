// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
fn main() {
    homer_lib::run();
    // let path = vec!["characters", "Bob.txt"];
    // print!("{:?}", std::env::current_dir().unwrap());
    // println!("{}", homer_lib::read_from_file(path.clone()));
    // let _ = homer_lib::insert_into_file(String::from("This is content"), path);
}
