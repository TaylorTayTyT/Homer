import TextEditor from "./Editor";
import { invoke } from "@tauri-apps/api/core";
import FileExplorer from "./FileExplorer";
import "./App.css"
export default function App(){
    invoke("recursive_directory_traversal").then(res => console.log(res)).catch(e => console.log(e))
    return(
        <div id = "container">
            <div id = "file_system">
                <FileExplorer/>
            </div>
            <div id = "text_editor">
                <TextEditor/>
            </div>
        </div>
    )
}