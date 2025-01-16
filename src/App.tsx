import TextEditor from "./Editor";
import { invoke } from "@tauri-apps/api/core";
import FileExplorer from "./FileExplorer";
import "./Styles/App.css"
export default function App(){
    invoke("recursive_directory_traversal").then(res => console.log(res)).catch(e => console.log(e))
    return(
        <div id = "container">
                <FileExplorer/>
            <div id = "text_editor">
                <TextEditor/>
            </div>
        </div>
    )
}