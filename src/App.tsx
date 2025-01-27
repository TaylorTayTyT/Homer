import TextEditor from "./Editor";
import { invoke } from "@tauri-apps/api/core";
import FileExplorer from "./FileExplorer";
import "./Styles/App.css"
import { memo, useEffect, useRef, useState } from "react";
import FullscreenOptions from "./FullScreenOptions";
export default function App() {
    const [isFullscreen, SetIsFullScreen] = useState(false);
    const editorRef = useRef();
    useEffect(()=>{
        editorRef.current = undefined; 
        const sidebar = document.getElementById("sidebar");
        if(!sidebar) return; 
        isFullscreen ? sidebar.style.position = "absolute" : sidebar.style.position = "relative";
    }, [isFullscreen]);
    useEffect(()=>{
        function sidebarDrag (e: MouseEvent) {
            console.log(e.clientX)
        };
        function editorDrag(e: MouseEvent){
            console.log(e.clientX)
        }
        document.getElementById("sidebar")?.addEventListener("mousedown", sidebarDrag);
        document.getElementById("sidebar")?.addEventListener("mouseover", (e) =>{
            const x = document.getElementById("sidebar")?.getBoundingClientRect().right;
            if(!x) return;
            console.log(x)
            console.log(e.clientX)
            if(x - e.clientX < 16){
                console.log("valid")
            }
            //START WORK HERE
        });
        document.getElementById("drag")?.addEventListener("mousedown", editorDrag);
    }, [])

    type FullScreenToggleProps = {
      SetIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
      editorRef: any;
    };

    //use this so you dont rerender the text editor
    const Control = memo(function Control(){
        return (
            <TextEditor/>
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
                <Control/>
            </div>
        </div>
    )
}