import TextEditor from "./Editor";
import { invoke } from "@tauri-apps/api/core";
export default function App(){
    invoke("get_book_parts").then(res => console.log(res)).catch(e => console.log(e))
    return(
        <div id = "container">
            <div id = "file_system">

            </div>
            <div id = "text_editor">
                <TextEditor/>
            </div>
        </div>
    )
}