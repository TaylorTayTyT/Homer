import { Editor } from '@tinymce/tinymce-react';
import "./Styles/Editor.css";
import { QuillIcon } from './Components/Logos';
type props = {
  type: string
};


export default function TextEditor({type}: props) {
  console.log(type)
  let content = ""; 
  switch (type){
    case "character":
      content = "<h1 style=\"text-align: center;\" data-mce-style=\"text-align: center;\">[Character Name]</h1><p><br data-mce-bogus=\"1\"></p><p>Appearance:</p><p>Background:</p><p>Lifestyle:</p><p>Interests:</p><p>Relationships:</p><p>Motivations:</p>";
      break;
    case "setting":
      content = "<h1 style=\"text-align: center;\" data-mce-style=\"text-align: center;\">[Setting]</h1><p><br data-mce-bogus=\"1\"></p><p>Geography:</p><p>Community Life:</p><p>Population Makeup:</p><p>Religion:</p><p>Technology:</p><p>Social Structure:</p><p>Government Structure:</p>"
      break; 
    default:
      content = ''
    }

    console.log(content)
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
                document.querySelectorAll("div[role=menubar]")?.forEach(menubar =>{
                  menubar.classList.toggle("disable");
                })
                document.querySelectorAll("div[role=toolbar]")?.forEach(toolbar =>{
                  if(toolbar.querySelector("button[data-mce-name=\"focus\"")){
                    return; 
                  } else {
                    toolbar.classList.toggle("disable");
                  }
                })
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
            toolbar: 'focus | undo redo | formatselect | bold italic backcolor | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            font_formats: 'Arial=arial,helvetica,sans-serif; Times New Roman=times new roman,times; Verdana=verdana,geneva;',
            fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
            content_style: tinyMCECSS,
          }}
        />

      </div></>
  );
}
