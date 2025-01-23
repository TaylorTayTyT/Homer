
import { useEffect } from "react";
import { QuillIcon } from "./Components/Logos";
import "./Styles/FullScreenOptions.css";
interface props {
    editorRef: any
}
///This is not working!
export default function FullscreenOptions({editorRef}: props){
    useEffect(()=>{
        document.querySelectorAll(".focus_icon").forEach(icon =>{
            icon.addEventListener("click", (e)=>{
                e.stopPropagation(); 
                if(!editorRef.current) return; 
                console.log(editorRef.current)
                editorRef.current.execCommand("mceFullScreen");
            })
        })
    }, [])
    return(
        <div id = "fullScreenOptionsContainer" dangerouslySetInnerHTML={{__html: QuillIcon}}>
        </div>
    )
}