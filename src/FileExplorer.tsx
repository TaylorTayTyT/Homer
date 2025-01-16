import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import RenderJSON from "./RenderJSON";
export default function FileExplorer() {
    const [files, SetFiles] = useState<any>();
    //assigns the event listeners to the file system dropdowns
    function assignDropDownsToFileSystem() {
        document.querySelectorAll("li").forEach((elem: HTMLElement) => {
            elem.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
    
                const targetElement: HTMLElement = e.target as HTMLElement;
                const target = targetElement?.closest("li") as HTMLElement; // Get the clicked li element
                console.log(target);
    
                const ulElements: NodeListOf<HTMLElement> = target.querySelectorAll(":scope > ul"); // Find all nested ul elements
                console.log(ulElements);
    
                ulElements.forEach((ulElement: HTMLElement) => {
                    // Toggle the "active" class for the nested ul elements
                    ulElement.classList.toggle("active");
    
                    // Optionally toggle the "active" class on the li elements within the clicked ul
                    ulElement.querySelectorAll("li").forEach((liElement: HTMLElement) => {
                        console.log(liElement.classList);
                        if (liElement.classList.contains("active")) {
                            liElement.classList.remove("active");
                        } else {
                            liElement.classList.add("active");
                        }
                        console.log(liElement.classList);
                        console.log("______");
                    });
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
            //traverseFiles(files["./src/Homer"]);
            assignDropDownsToFileSystem();
        }
    }, [files])
    return (
        <div id="file_system">
            <RenderJSON data={files} first={true} />
        </div>
    );
};

