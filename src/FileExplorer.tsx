import {useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import RenderJSON from "./RenderJSON";
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
    }

    useEffect(()=>{
        recursiveDirectoryTraversal(); 
    }, [])

    useEffect(()=>{
        console.log(files)
        if(files) traverseFiles(files["./src/Homer"]); 
    }, [files])
    return (
        <div id="file_system">
            <RenderJSON data={files} first = {true}/>
        </div>
      );
};

