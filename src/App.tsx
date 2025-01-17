import TextEditor from "./Editor";
import { invoke } from "@tauri-apps/api/core";
import FileExplorer from "./FileExplorer";
import "./Styles/App.css"
export default function App(){
    return(
        <div id = "container">
                <FileExplorer/>
            <div id = "text_editor">
                <TextEditor/>
            </div>
        </div>
    )
}