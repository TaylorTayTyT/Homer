import TextEditor from "./Editor";
import { invoke } from "@tauri-apps/api/core";
import FileExplorer from "./FileExplorer";
import "./Styles/App.css"
import { memo, useEffect, useRef, useState } from "react";
import Timeline from "./Timeline";
import FullscreenOptions from "./FullScreenOptions";
import Instructions from "./Instructions";
export default function App() {
    const [isFullscreen, SetIsFullScreen] = useState(false);
    const [activeFile, SetActiveFile] = useState<string>();
    const [type, SetType] = useState<string>(); 
    const editorRef = useRef();
    useEffect(() => {
        editorRef.current = undefined;
        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;
        isFullscreen ? sidebar.style.position = "absolute" : sidebar.style.position = "relative";
    }, [isFullscreen]);
    useEffect(() => {
        function sidebarDrag(e: MouseEvent) {
            const sidebar = document.getElementById("sidebar");
            if(!sidebar) return; 
            let barrier = document.querySelector("li[data-first=true] strong div.arrow")?.getBoundingClientRect().right; 
            function adjust(e: MouseEvent){
                if(!sidebar) return;
                let newWidth = e.clientX
                if(!barrier || newWidth < barrier) return; 
                //barrier += 16;
                sidebar.style.width = `${newWidth}px`;
            }
            document.addEventListener("mousemove", adjust);
            document.addEventListener('mouseup', (e) =>{
                document.removeEventListener("mousemove", adjust);
            })
        };

        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            sidebar.addEventListener("mousedown", sidebarDrag);
        }

    }, [])
    return (
        <div id="container" data-fullscreen={isFullscreen}>
            <div id="sidebar">
                <div>
                    {isFullscreen ? "" : <FileExplorer setActiveFile={SetActiveFile} SetType={SetType}/>}
                </div>
            </div>
            <div id="text_editor">
                {type === "timeline" ? <Timeline/> : type ? <TextEditor type={type} activeFile={activeFile}/>  : <Instructions/>}
            </div>
        </div>
    )
}