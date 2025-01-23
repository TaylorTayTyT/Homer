import TextEditor from "./Editor";
import { invoke } from "@tauri-apps/api/core";
import FileExplorer from "./FileExplorer";
import "./Styles/App.css"
import { useEffect, useRef, useState } from "react";
import FullscreenOptions from "./FullScreenOptions";
export default function App() {
    const [isFullscreen, SetIsFullScreen] = useState(false);
    const editorRef = useRef();
    useEffect(()=>{
        editorRef.current = undefined; 
        const sidebar = document.getElementById("sidebar");
        if(!sidebar) return; 
        isFullscreen ? sidebar.style.position = "absolute" : sidebar.style.position = "relative";
    }, [isFullscreen])
    return (
        <div id="container" data-fullscreen={isFullscreen}>
            <div id="sidebar">
                {isFullscreen ? <FullscreenOptions editorRef={editorRef} /> : <FileExplorer />}
            </div>
            <div id="text_editor">
                <TextEditor SetIsFullScreen={SetIsFullScreen} editorRef={editorRef}/>
            </div>
        </div>
    )
}