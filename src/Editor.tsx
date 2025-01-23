import React, { useRef, Dispatch, SetStateAction } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import "./Styles/Editor.css";
import { QuillIcon } from './Components/Logos';
type FullScreenToggleProps = {
  SetIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  editorRef: any;
};


export default function TextEditor({ SetIsFullScreen, editorRef }: FullScreenToggleProps) {
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  const tinyMCECSS = 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } #tinymce{margin-left: 10%;width: 80%;} .tox-tinymce:focus {outline: none !important;box-shadow: none !important;}';
  return (
    <><button style={{zIndex: 10000, right: 0, position: "absolute"}} onClick={() => {
      editorRef.current.execCommand("mceFullScreen");
    }}>fdfs</button>
      <div id='editor' aria-hidden="false">
        <Editor
          key={editorRef.current ? 'editor-mounted' : 'editor-unmounted'}
          apiKey='2j6d39ibmyedqmngituet4cu6t6itq6p5ipd319un1patjk8'
          id="editor"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            setup: (editor) => {
              // Define the custom button
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
              editor.on('FullscreenStateChanged', (e) => {
                document.querySelector("div[role=menubar]")?.classList.toggle("disable");
                document.querySelectorAll("div[role=toolbar]").forEach((tool) => {
                  tool.classList.toggle("disable");
                });
                document.querySelectorAll("div[role=toolbar] div").forEach((tool) => {
                  tool.classList.toggle("disable");
                })
                SetIsFullScreen(e.state)
              })
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
            toolbar: 'focus undo redo | formatselect | bold italic backcolor | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            font_formats: 'Arial=arial,helvetica,sans-serif; Times New Roman=times new roman,times; Verdana=verdana,geneva;',
            fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
            content_style: tinyMCECSS,
          }}
        />

      </div></>
  );
}
