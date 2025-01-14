import { ReactElement, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
export default function FileExplorer(){
    const [files, SetFiles] = useState<any>(); 
    async function recursiveDirectoryTraversal(){
        invoke("recursive_directory_traversal")
        .then((res: any) => {
            console.log(res)
            SetFiles(res)
        })
        .catch((e: any) => console.log(e))
    }

    function convertToHTML(value: string) : ReactElement{
        return(
            <div>
                {value}
            </div>
        )
    }

    function traverse(json: any) {
        if (typeof json === "object" && json !== null) {
            for (const key in json) {
                console.log(key, json[key]);
                traverse(json[key]); // Recursively traverse nested objects
            }
        }
    }

    function traverseFiles(files: any){
        traverse(files)
        // const HTMLElements : ReactElement[] = []; 
        // const frontier = Object.keys(files);
        // while(frontier){
        //     const file = frontier.shift(); 
        //     if(!file) continue
        //     HTMLElements.push(convertToHTML(file));
        //     files[file].forEach((item: string) =>{
        //         frontier.unshift(item);
        //     })
            
        // }
        // console.log(HTMLElements)
    }
    useEffect(()=>{
        recursiveDirectoryTraversal(); 
    }, [])
    useEffect(()=>{
        if(files) traverseFiles(files["./src/Homer"]); 
    }, [files])
    return (
        <div>
        </div>
      );
};

