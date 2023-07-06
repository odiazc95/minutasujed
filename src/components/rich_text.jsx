import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

const EditText = () => {
  const editor = useRef(null);

  const [content, setContent] = useState("");

  return (
    <JoditEditor
      ref={editor}
      value={content}
      onBlur={(newContent) => setContent(newContent)}
      onChange={(newContent) => {}}
    />
  );
};

export default EditText;
