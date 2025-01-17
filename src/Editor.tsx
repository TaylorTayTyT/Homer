import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import "./Styles/Editor.css"

export default function TextEditor() {
  const editorRef: any = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div id='editor'>
      <Editor
        apiKey='2j6d39ibmyedqmngituet4cu6t6itq6p5ipd319un1patjk8'
        id="editor"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          setup: (editor) => {
            // Define the custom button
            editor.ui.registry.addButton('focus', {
              text: 'Focus', // Button text
              icon: 'none', // Optional, use TinyMCE's built-in icons
              tooltip: 'Enter focus mode',
              onAction: () => {
                // Define the button's action
                editor.execCommand("mceFullScreen")
              },
            });
            editor.on('FullscreenStateChanged', (e) =>{
              document.querySelector(".tox-editor-header")?.classList.toggle("disable")
              document.getElementById("file_system")?.classList.toggle("disable")
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
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />

    </div>
  );
}
