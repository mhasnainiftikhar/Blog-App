import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function RTE() {
  const editorRef = useRef(null);
  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };
  return (
    <Editor
      initialValue="<p>Hello, world!</p>"
      apiKey="sanksmarng71poz0amy4uoi8dm8douact97jtqojopsea4om"
      ref={editorRef}
      onEditorChange={handleEditorChange}
      toolbar="undo redo | styleselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image"
      contenteditable={true}
      plugins="link image code"
      skin="silver"
      height="500"
      width="100%"
    />
  );
}

export default RTE;
