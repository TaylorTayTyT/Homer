import { Editor } from '@tinymce/tinymce-react';
import "./Styles/Editor.css";
import { QuillIcon } from './Components/Logos';
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useRef } from 'react';
import tinymce from 'tinymce';
type props = {
  type: string | undefined,
  activeFile: string | undefined,
  activeFileHTML: Element | undefined,
  activeFileRef: React.MutableRefObject<Element | undefined>
};

function setContent(type: string | undefined, activeFile: string | undefined) {
  switch (type) {
    case "characters":
      return "<h1 style=\"text-align: center;\" data-mce-style=\"text-align: center;\">[Character Name]</h1><p><br data-mce-bogus=\"1\"></p><p>Appearance:</p><p>Background:</p><p>Lifestyle:</p><p>Interests:</p><p>Relationships:</p><p>Motivations:</p>";
    case "setting":
      return `<h1 style="text-align: center;" data-mce-style="text-align: center;">${activeFile}</h1><p><br data-mce-bogus="1"></p><p>Geography:</p><p>Community Life:</p><p>Population Makeup:</p><p>Religion:</p><p>Technology:</p><p>Social Structure:</p><p>Government Structure:</p>`
    default:
      return ''
  }
}
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
  let content = setContent(type, activeFile);
  const tinyMCECSS = 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } #tinymce{margin-left: 10%;width: 80%;} .tox-tinymce:focus {outline: none !important;box-shadow: none !important;}';

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
                    let local_path: string[] | undefined = [];
                    if(activeFileRef) local_path = findParentFolder(activeFileRef.current, [activeFile ? activeFile : ""]);
                    if(local_path) {
                      local_path = local_path.reverse();
                      local_path.pop(); 
                    }
                    //console.log(local_path)
                    invoke("insert_into_file", {content: editor.getContent(), path: local_path})
                  }
                })
                editor.ui.registry.addIcon('save', "save")
              }
              
              //adds appropriate action on top of event handlers
              function setEventHandlers() {
                editor.on('FullscreenStateChanged', (e) => {
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
              addCustomButtons(); 
              setEventHandlers();
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
