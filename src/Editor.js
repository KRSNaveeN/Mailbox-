import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the 


const MyRichTextEditor = () => {
  const [value1, setValue] = useState('');

  const handleChange = (html) => {
    setValue(html);

  };

  const extractPlainText = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText || div.textContent || '';
  };

  console.log(value1);
  let plainText = extractPlainText(value1);
  console.log(plainText);
 
  return (
    <div className='editor-container' >
      <ReactQuill
        theme="snow" // You can use 'bubble' theme for a simpler toolbar
        value={value1}
        onChange={handleChange}
        modules={{
          toolbar: [
            // [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
      />
    </div>
  );
};

export default MyRichTextEditor;
