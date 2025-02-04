import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import RenderJSON from "./RenderJSON";
import "./Styles/FileExplorer.css";

interface props{
    setActiveFile: any,
    SetType: any
}

export default function FileExplorer({setActiveFile, SetType} : props) {
    const [files, SetFiles] = useState<any>();
    const right_triangle = " \u{25B6}";
    const down_triangle = " \u{25BC}";

    //find the parent folder
    function findParentFolder(elem: Element | null){
        const parents = ['chapter', 'characters', 'manuscript', 'setting', 'timeline']
        if(!elem || elem.id === "file_system") return; 
        const bold = elem.querySelector("strong")
        if(bold && parents.includes(bold.innerText.slice(0, bold.innerText.length - 2))) return bold.innerText.slice(0, bold.innerText.length - 2)
        return findParentFolder(elem.parentElement)
    }

    //handles the behavior of clicking on a file
    function filePrep(elem: Element){
        elem.classList.toggle("active");
        const strong = elem.querySelector("strong");
        if(!strong) return; 
        const arrow = strong.querySelector("div");
        if(!arrow) return; 
        if(!elem.querySelector("ul")){
            arrow.innerText = "";
            strong.classList.add("file");
            strong.addEventListener("click", ()=>{
                console.log(elem)
                setActiveFile(strong.innerText);
                SetType(findParentFolder(elem))
            });
            return; 
        }
        arrow.innerText = elem.querySelector("ul")?.classList.contains("active") ? down_triangle : right_triangle;
    }
    //assigns the event listeners to the file system dropdowns
    function assignDropdowns(e: MouseEvent){
        e.stopPropagation(); // Prevent event bubbling
        let targetElement: HTMLElement | null = e.target as HTMLElement; //grab the targeted list item 
        targetElement = targetElement.closest("li");
        if(!targetElement) return; 
        const targetChildUL: HTMLElement | null = targetElement.querySelector("ul"); //grab the child ul - there will only be one of these
        if(!targetChildUL) return //there are no children - leaf nodes
        targetChildUL.classList.toggle("active"); //
        const arrow = targetElement.querySelector("strong")?.querySelector("div"); //change the arrow status of targeted list item
        if(arrow){
            arrow.innerText = targetChildUL.classList.contains("active") ? down_triangle : right_triangle;
        }
        const targetChildULLI = targetChildUL.querySelectorAll(":scope > li");
        targetChildULLI.forEach((elem: Element) =>{
            filePrep(elem);
        });
    }
    //wrapper for dropdown ie begins the magic
    function assignDropDownsToFileSystem() {
        document.querySelectorAll("li").forEach((elem: HTMLElement) => {
            elem.addEventListener('click', (e) => {
                e.stopPropagation(); 
                assignDropdowns(e); 
            });
        });
    }

    //calls rust backend to explore the directory
    async function recursiveDirectoryTraversal() {
        invoke("recursive_directory_traversal")
            .then((res: any) => {
                SetFiles(res)
            })
            .catch((e: any) => console.log(e))
    }
    useEffect(() => {
        recursiveDirectoryTraversal();
    }, [])

    useEffect(() => {
        if (files) {
            assignDropDownsToFileSystem();
        }
    }, [files])
    return (
        <div id="file_system">
            <RenderJSON data={files} first={true} />
        </div>
    );
};

