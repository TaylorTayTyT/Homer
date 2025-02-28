import { Editor } from '@tinymce/tinymce-react';
import "./Styles/Editor.css";
import { QuillIcon } from './Components/Logos';
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useRef, useState } from 'react';
import { SaveIcon } from './Components/Logos';
import tinymce from 'tinymce';
type props = {
  type: string | undefined,
  activeFile: string | undefined,
  activeFileHTML: Element | undefined,
  activeFileRef: React.MutableRefObject<Element | undefined>
};
function findParentFolder(elem: Element | null | undefined, address: string[]) {
  //NEED TO FIX THIS
  const parents = ['chapter', 'characters', 'manuscript', 'setting', 'timeline']
  if (!elem || elem.id === "file_system") return;
  const bold = elem.querySelector("strong");
  // console.log(elem)
  // console.log(bold)
  // console.log("________________")
  if (elem.tagName === "LI" && bold) {
    address.push(bold.innerText.split(".").length == 2 ? bold.innerText : bold.innerText.slice(0, bold.innerText.length - 2));
  }
  if (bold && parents.includes(bold.innerText.slice(0, bold.innerText.length - 2))) return address //end condition
  return findParentFolder(elem.parentElement, address)
}

export default function TextEditor({ type, activeFile, activeFileHTML, activeFileRef }: props) {
  //console.log(activeFile);
  const [content, SetContent] = useState("");
  async function setContentFromFile(activeFile: string | undefined) {
    console.log(activeFileRef.current, activeFile)
    let local_path = findParentFolder(activeFileHTML, [activeFile ? activeFile : ""]);
    if(local_path) {
      local_path = local_path.reverse();
      local_path.pop(); 
      console.log(local_path)
      let cont : string = await invoke("read_from_file", {path: local_path});
      SetContent(cont);
    }
    //console.log(local_path)
    // let cont : string = await invoke("read_from_file", {path: local_path});
    // SetContent(cont);
  }
  setContentFromFile(activeFile)
  useEffect(()=>{
    console.log(content)
  }, [content])
  const tinyMCECSS = 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } p.focus:hover{font-weight: bold;} #tinymce{margin-left: 10%;width: 80%;} .tox-tinymce:focus {outline: none !important;box-shadow: none !important;}';

  return (
    <>

      <div id='editor' aria-hidden="false">
        <Editor
          apiKey='2j6d39ibmyedqmngituet4cu6t6itq6p5ipd319un1patjk8'
          id="editor"
          initialValue={content}
          init={{
            setup: (editor) => {
              //console.log("setting up")
              //adds all custom buttons
              function addCustomCommands(){
                editor.addCommand('save', ()=>{
                  let local_path: string[] | undefined = [];
                    if(activeFileRef) local_path = findParentFolder(activeFileRef.current, [activeFile ? activeFile : ""]);
                    if(local_path) {
                      local_path = local_path.reverse();
                      local_path.pop(); 
                    }
                    //console.log(local_path)
                    invoke("insert_into_file", {content: editor.getContent(), path: local_path})
                    .then((value: any) =>{
                      let message : string; 

                      if(value === 1){
                        message = "saved";
                      } else{
                        message = "something went wrong while saving";
                      }
                      editor.notificationManager.open({
                        text: message,
                        type: 'success',
                        timeout: 3000
                      })
                      
                    });
                })
              }
              function addCustomButtons() {
                editor.ui.registry.addButton('focus', {
                  text: 'Focus', // Button text
                  icon: 'focus', // Optional, use TinyMCE's built-in icons
                  tooltip: 'Enter focus mode',
                  onAction: () => {
                    // Define the button's action
                    editor.execCommand("mceFullScreen")
                  },
                });
                editor.ui.registry.addIcon('focus', QuillIcon);
                
                editor.ui.registry.addButton('save', {
                  text: 'Save',
                  icon: 'save',
                  tooltip: 'save',
                  onAction: () => {
                    editor.execCommand('save');
                  }
                })
                editor.ui.registry.addIcon('save', SaveIcon);
                //START HEREEEEEEE DOING LOGO SHIT
              }
              
              //adds appropriate action on top of event handlers
              function setEventHandlers() {
                editor.on('FullscreenStateChanged', (e) => {
                  console.log('fullscreen toggled')
                  editor.dom.select('p').forEach(p => p.classList.toggle('focus'))
                  document.querySelectorAll("#tinymce p").forEach(p =>{
                    console.log(p)
                    p.classList.toggle('focus')
                    //console.log(p.classList.contains('focus'))
                  })
                  document.querySelectorAll("div[role=menubar]")?.forEach(menubar => {
                    menubar.classList.toggle("disable");
                  })
                  document.querySelectorAll("div[role=toolbar]")?.forEach(toolbar => {
                    if (toolbar.querySelector("button[data-mce-name=\"focus\"")) {
                      return;
                    } else {
                      toolbar.classList.toggle("disable");
                    }
                  })
                })
              }
              //adds custom keyboard shortcuts
              function addKeyboardShortcuts(){
                editor.addShortcut('Ctrl+S', "Save", ()=> {editor.execCommand('save')})
              }
              addCustomCommands(); 
              addCustomButtons(); 
              setEventHandlers();
              addKeyboardShortcuts();
            },
            height: window.innerHeight,
            menubar: true,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
            ],
            toolbar: 'focus save | undo redo | formatselect | bold italic backcolor | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            font_formats: 'Arial=arial,helvetica,sans-serif; Times New Roman=times new roman,times; Verdana=verdana,geneva;',
            fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
            content_style: tinyMCECSS,
          }}
        />

      </div></>
  );
}
