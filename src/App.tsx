import TextEditor from "./Editor";
import { invoke } from "@tauri-apps/api/core";
import FileExplorer from "./FileExplorer";
import "./Styles/App.css"
import { memo, useEffect, useRef, useState } from "react";
import Timeline from "./Timeline";
import FullscreenOptions from "./FullScreenOptions";
export default function App() {
    const [isFullscreen, SetIsFullScreen] = useState(false);
    const editorRef = useRef();
    useEffect(() => {
        editorRef.current = undefined;
        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;
        isFullscreen ? sidebar.style.position = "absolute" : sidebar.style.position = "relative";
    }, [isFullscreen]);
    useEffect(() => {
        function sidebarDrag(e: MouseEvent) {
            const initX = e.clientX; 
            const sidebar = document.getElementById("sidebar");
            if(!sidebar) return; 
            const sideBarWidth = sidebar.getBoundingClientRect().width;
            let barrier = document.querySelector("li[data-first=true] strong div.arrow")?.getBoundingClientRect().right; 
            function adjust(e: MouseEvent){
                if(!sidebar) return;
                let newWidth = e.x
                if(!barrier || newWidth < barrier) return; 
                barrier += 16;
                sidebar.style.width = `${newWidth}px`;
            }
            sidebar?.addEventListener("mousemove", adjust);
            sidebar?.addEventListener('mouseup', (e) =>{
                sidebar.removeEventListener("mousemove", adjust);
            })
        };

        const sidebar = document.getElementById("sidebar");

        if (sidebar) {
            sidebar.addEventListener("mousedown", sidebarDrag);
            sidebar.addEventListener("mousemove", (e)=>{
                if(sidebar.getBoundingClientRect().right - e.clientX < 16) sidebar.style.cursor = "col-resize"
                else{
                    sidebar.style.cursor = "";
                }
            })
        }

    }, [])

    //use this so you dont rerender the text editor
    const Control = memo(function Control() {
        return (
            <TextEditor type="setting"/>
        )
    });
    return (
        <div id="container" data-fullscreen={isFullscreen}>
            <div id="sidebar">
                <div>
                    {isFullscreen ? "" : <FileExplorer />}
                </div>
            </div>
            <div id="text_editor">
                {/* <Timeline/> */}
                <Control />
            </div>
        </div>
    )
}