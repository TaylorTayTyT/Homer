import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import RenderJSON from "./RenderJSON";
import "./Styles/FileExplorer.css";
export default function FileExplorer() {
    const [files, SetFiles] = useState<any>();
    const right_triangle = " \u{25B6}";
    const down_triangle = " \u{25BC}";
    //assigns the event listeners to the file system dropdowns
    function assignDropDownsToFileSystem() {
        document.querySelectorAll("li").forEach((elem: HTMLElement) => {
            elem.addEventListener('click', (e) => {
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
                    elem.classList.toggle("active");
                    const strong = elem.querySelector("strong");
                    if(!strong) return; 
                    const arrow = strong.querySelector("div");
                    if(!arrow) return; 
                    if(!elem.querySelector("ul")){
                        arrow.innerText = "";
                        return; 
                    }
                    
                    arrow.innerText = elem.querySelector("ul")?.classList.contains("active") ? down_triangle : right_triangle;
                });
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

