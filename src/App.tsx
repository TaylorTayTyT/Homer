import TextEditor from "./Editor";
import { invoke } from "@tauri-apps/api/core";
import FileExplorer from "./FileExplorer";
import "./Styles/App.css"
import { act, memo, useEffect, useRef, useState } from "react";
import Timeline from "./Timeline";
import FullscreenOptions from "./FullScreenOptions";
import { JSX } from "react";
import Instructions from "./Instructions";
export default function App() {
    const [isFullscreen, SetIsFullScreen] = useState(false);
    const [activeFile, SetActiveFile] = useState<string>();
    const [activeFileHTML, SetActiveFileHTML] = useState<Element>(); 
    const [type, SetType] = useState<string>();
    const activeFileRef = useRef(activeFileHTML);
    const [editor, SetEditor] = useState<JSX.Element>(<></>); 

    useEffect(() => {
        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;
        isFullscreen ? sidebar.style.position = "absolute" : sidebar.style.position = "relative";
    }, [isFullscreen]);
    useEffect(() => {
        // handles the file explorer resize
        function sidebarDrag(e: MouseEvent) {
            const sidebar = document.getElementById("sidebar");
            
            if(!sidebar) return; 
            let barrier = document.querySelector("li[data-first=true] strong div.arrow")?.getBoundingClientRect().right; 
            function adjust(e: MouseEvent){
                if(!sidebar) return; 
                let newWidth = e.clientX
                if(!barrier || newWidth < barrier) return; 
                sidebar.style.width = `${newWidth}px`;
            }
            document.addEventListener("mousemove", adjust);
            document.addEventListener('mouseup', (e) =>{
                document.removeEventListener("mousemove", adjust);
            })
        };

        function addCursor(e: MouseEvent){
            //START HERE FIND OUT HOW TO ADD THE CURSOR
            const sidebar = document.getElementById("sidebar");
            if(!sidebar) return; 
            sidebar.addEventListener("mousemove", (e: MouseEvent) =>{
                const r = sidebar?.getBoundingClientRect().right
                if(r - e.x < 16) sidebar.style.cursor = "col-resize";
                else removeCursor(e)
            })
            
        }

        function removeCursor(e: MouseEvent){
            const sidebar = document.getElementById("sidebar");
            if(!sidebar) return; 
            sidebar.style.cursor = "auto";
        }

        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            sidebar.addEventListener("mouseover", addCursor)
            sidebar.addEventListener("mousedown", sidebarDrag);
        }

    }, []);

    useEffect(()=>{
        activeFileRef.current = activeFileHTML;
    }, [activeFileHTML])

    return (
        <div id="container" data-fullscreen={isFullscreen}>
            <div id="sidebar">
                <div>
                    {isFullscreen ? "" : <FileExplorer setActiveFile={SetActiveFile} SetType={SetType} SetActiveFileHTML={SetActiveFileHTML}/>}
                </div>
            </div>
            <div id="text_editor">
                {type === "timeline" ? <Timeline/> : type ? <TextEditor type={type} activeFile={activeFile} activeFileHTML={activeFileHTML} activeFileRef={activeFileRef}/>  : <Instructions/>}
            </div>
        </div>
    )
}