import TextEditor from "./Editor";
import { invoke } from "@tauri-apps/api/core";
import FileExplorer from "./FileExplorer";
import "./Styles/App.css"
import { useState } from "react";
import FullscreenOptions from "./FullScreenOptions";
export default function App() {
    const [isFullscreen, SetIsFullScreen] = useState(false);
    return (
        <div id="container" data-fullscreen={isFullscreen}>
            <div id="sidebar">
                {isFullscreen ? <FullscreenOptions /> : <FileExplorer />}
            </div>
            <div id="text_editor">
                <TextEditor SetIsFullScreen={SetIsFullScreen} />
            </div>
        </div>
    )
}