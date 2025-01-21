import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import RenderJSON from "./RenderJSON";
export default function FileExplorer() {
    const [files, SetFiles] = useState<any>();
    const right_triangle = " \u{25B6}";
    const down_triangle = " \u{25BC}";
    //assigns the event listeners to the file system dropdowns
    function assignDropDownsToFileSystem() {
        document.querySelectorAll("li").forEach((elem: HTMLElement) => {
            elem.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling

                const targetElement: HTMLElement = e.target as HTMLElement;
                const target = targetElement?.closest("li") as HTMLElement; // Get the clicked li element

                const ulElements: NodeListOf<HTMLElement> = target.querySelectorAll(":scope > ul"); // Find only child ul elements

                ulElements.forEach((ulElement: HTMLElement) => {
                    // Toggle the "active" class for the nested ul elements
                    const parent = ulElement.parentElement
                    const parentArrow = parent?.querySelector("strong")?.querySelector("div");
                    ulElement.classList.toggle("active");

                    // Optionally toggle the "active" class on the li elements within the clicked ul
                    ulElement.querySelectorAll("li").forEach((liElement: HTMLElement) => {
                        const liBold = liElement.querySelector("strong");
                        const liBoldDiv = liBold?.querySelector("div");
                        if (liElement.classList.contains("active")) {
                            liElement.classList.remove("active");
                            if(parentArrow){
                                parentArrow.innerText = right_triangle;
                            }

                        } else {
                            liElement.classList.add("active");
                            if (parentArrow) {
                                parentArrow.innerText = down_triangle;
                            }
                        }
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

