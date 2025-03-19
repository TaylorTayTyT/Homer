import { invoke } from "@tauri-apps/api/core";
import FileExplorer from "./FileExplorer";
import "./Styles/App.css"
import { act, memo, useEffect, useRef, useState } from "react";
import Timeline from "./Timeline";
import Instructions from "./Instructions";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import ReactCodeMirror, { minimalSetup } from "@uiw/react-codemirror";
import Icon from "./Icon";
import { SaveIcon, BoldIcon, ItalicsIcon, UnderlineIcon, StrikethroughIcon, FontFamilyIcon, FontSizeIcon, FontColorIcon, HighlighterIcon, LeftAlignIcon, CenterAlignIcon, RightAlignIcon } from "./Components/Logos";
import leftAlignIcon from "./Components/photos/left_align.png";



export default function App() {
    const [isFullscreen, SetIsFullScreen] = useState(false);
    const [activeFile, SetActiveFile] = useState<string>();
    const [activeFileHTML, SetActiveFileHTML] = useState<Element>();
    const [type, SetType] = useState<string>();
    const activeFileRef = useRef(activeFileHTML);
    const [windowSize, SetWindowSize] = useState(window.innerHeight);
    const [showAlignmentOptions, SetShowAlignmentOptions] = useState(false);
    const [alignment, SetAlignment] = useState("left");

    const [value, SetValue] = useState("");

    function editorChanges(value: string) {
        SetValue(value);
    }

    useEffect(() => {
        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;
        isFullscreen ? sidebar.style.position = "absolute" : sidebar.style.position = "relative";
    }, [isFullscreen]);

    // handles the file explorer resize
    function sidebarDrag() {
        const sidebar = document.getElementById("sidebar");

        if (!sidebar) return;
        let barrier = document.querySelector("li[data-first=true] strong div.arrow")?.getBoundingClientRect().right;
        function adjust(e: MouseEvent) {
            if (!sidebar) return;
            let newWidth = e.clientX
            if (!barrier || newWidth < barrier) return;
            sidebar.style.width = `${newWidth}px`;
        }
        document.addEventListener("mousemove", adjust);
        document.addEventListener('mouseup', (e) => {
            document.removeEventListener("mousemove", adjust);
        })
    };
    //makes sure you have pointer when resizing
    function addCursor(e: MouseEvent) {
        //START HERE FIND OUT HOW TO ADD THE CURSOR
        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;
        sidebar.addEventListener("mousemove", (e: MouseEvent) => {
            const r = sidebar?.getBoundingClientRect().right
            if (r - e.x < 16) sidebar.style.cursor = "col-resize";
            else removeCursor(e)
        })

    }
    //removes the pointer when done resizing
    function removeCursor(e: MouseEvent) {
        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;
        sidebar.style.cursor = "auto";
    }

    useEffect(() => {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            sidebar.addEventListener("mouseover", addCursor)
            sidebar.addEventListener("mousedown", sidebarDrag);
        }

        let startState = EditorState.create({
            doc: "Hello World",
            extensions: [keymap.of(defaultKeymap)]
        });
        let view = new EditorView({
            state: startState,
            parent: document.getElementById("editor") as HTMLElement //forces there to be an element with id editor
        })
    }, []);

    useEffect(() => {
        activeFileRef.current = activeFileHTML;
    }, [activeFileHTML])

    function save() {
        alert('save');
        return true;
    }

    const save_keymap = keymap.of([
        {
            key: 'Mod-s',
            run: () => {
                return save();
            }
        }
    ])

    const extensions = [save_keymap, EditorView.lineWrapping]

    return (
        <div id="container" data-fullscreen={isFullscreen}>
            <div id="sidebar">
                <div>
                    {isFullscreen ? "" : <FileExplorer setActiveFile={SetActiveFile} SetType={SetType} SetActiveFileHTML={SetActiveFileHTML} />}
                </div>
            </div>
            <div id="text_editor">
                {type === "timeline" ? <Timeline /> : type ?
                    <div>
                        <div id="editor_controls">
                            <div id="file_control">
                                <Icon icon={SaveIcon} action={save} description="save" />
                            </div>
                            <div id="basic_text_formatting">
                                <div className="decoration">
                                    <Icon icon={BoldIcon} action={() => console.log("bold")} />
                                    <Icon icon={ItalicsIcon} action={() => console.log("italics")} />
                                    <Icon icon={UnderlineIcon} action={() => console.log("italics")} />
                                    <Icon icon={StrikethroughIcon} action={() => console.log("italics")} />
                                </div>
                                <div className="fonts">
                                    <Icon icon={FontFamilyIcon} action={() => console.log("italics")} />
                                    <Icon icon={FontSizeIcon} action={() => console.log("italics")} />
                                    <Icon icon={FontColorIcon} action={() => console.log("italics")} />
                                    <Icon icon={HighlighterIcon} action={() => console.log("italics")} />
                                </div>
                            </div>
                            <div id="paragraph_formatting">
                                {alignment === "left" ? <Icon icon={LeftAlignIcon} action={()=>SetShowAlignmentOptions(!showAlignmentOptions)} /> : 
                                    alignment === "center" ? <Icon icon={CenterAlignIcon} action={()=>SetShowAlignmentOptions(!showAlignmentOptions)}/> :
                                    <Icon icon={RightAlignIcon} action={()=>SetShowAlignmentOptions(!showAlignmentOptions)}/>}
                                {showAlignmentOptions ? <div style={{display: "flex"}}>
                                    <Icon icon={LeftAlignIcon} action={()=>{
                                        SetAlignment("left"); 
                                        }} />
                                    <Icon icon={CenterAlignIcon} action={()=>SetAlignment("center")} />
                                    <Icon icon={RightAlignIcon} action={()=>SetAlignment("right")} />
                                    </div> : ""}
                            </div>
                        </div>
                        <ReactCodeMirror
                            value="hello"
                            editable={true}
                            basicSetup={{
                                lineNumbers: false,
                                foldGutter: false,
                                highlightActiveLine: false,
                                allowMultipleSelections: false,
                                defaultKeymap: true,
                            }}
                            height={windowSize * 0.9 + "px"}
                            onChange={editorChanges}
                            extensions={extensions}
                        /></div> : <Instructions />}
            </div>
        </div>
    )
}