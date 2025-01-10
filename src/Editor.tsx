import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TextEditor() {
  const editorRef: any = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey='2j6d39ibmyedqmngituet4cu6t6itq6p5ipd319un1patjk8'
        id="editor"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
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
          toolbar: 'undo redo | formatselect | bold italic backcolor | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
          font_formats: 'Arial=arial,helvetica,sans-serif; Times New Roman=times new roman,times; Verdana=verdana,geneva;',
          fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />

    </>
  );
}
