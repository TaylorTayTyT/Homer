// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
fn main() {
    homer_lib::run();
    // let a = homer_lib::read_from_file("src\\Homer\\chapter\\Chapter1.txt");
    // println!("{}", a);
}
