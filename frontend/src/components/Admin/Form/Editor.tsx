import styled from 'styled-components';
// import React, { useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
// import TextArea from 'antd/es/input/TextArea';
// import { Essentials } from '@ckeditor/ckeditor5-essentials';
// import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
// EditorProps
type EditorProps = {
  // handleChange: (data: string) => void;
  // For setstateaction
  // SetContent: React.Dispatch<React.SetStateAction<string>>;
  defaultData?: string;
  setContent: (data: string) => void;
  data: string;
  // SetContent: React.Dispatch<SetStateAction<string>>
}



const Wrapper = styled.div`
  .ck-editor {
    max-width: 100%;
    margin: 1em 0;
    // border-radius: 8px;
  }
  .ck-editor__main {
    min-height: 100px;
    > div {
      min-height: 100px;
      border-radius: 0px;
    }
  }
  .ck.ck-editor__main>.ck-editor__editable  {
    border-radius: 0 0 8px 8px;
  }
  .ck.ck-editor .ck-editor__top .ck-sticky-panel .ck-toolbar,
  .ck-sticky-panel__content  {
    border-radius: 8px 8px 0 0;
  }
}
`;

export default function Editor(props: EditorProps) {
  const { defaultData, setContent } = props;
  // const editorD=useRef('');

  //   function uploadAdapter(loader) {
  //     return {
  //       upload: () => {
  //         return new Promise((resolve, reject) => {
  //           const body = new FormData();
  //           loader.file.then((file) => {
  //             body.append("files", file);
  //             fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
  //               method: "post",
  //               body: body
  //             })
  //               .then((res) => res.json())
  //               .then((res) => {
  //                 resolve({
  //                   default: `${API_URL}/${res.filename}`
  //                 });
  //               })
  //               .catch((err) => {
  //                 reject(err);
  //               });
  //           });
  //         });
  //       }
  //     };
  //   }


  //   function uploadPlugin(editor) {
  //     editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
  //       return uploadAdapter(loader);
  //     };
  //   }

  // .ck-editor__main {
  //   min-height: 200px;
  //   > div {
  //     min-height: 200px;
  //   }

  return (
    <Wrapper>
      <CKEditor
        // config={{
        //   extraPlugins: [uploadPlugin]
        // }}
        config={{

          // plugins: [Paragraph, Bold, Italic, Essentials],
          // toolbar: [
          //   'Underline',
          //   'Strikethrough',
          //   'Code',
          //   'Subscript',
          //   'Superscript',
          //   'link',
          //   'bulletedList',
          //   'numberedList'
          // ]
        }}

        data={defaultData}
        editor={ClassicEditor}
        onReady={(editor) => { }}
        onBlur={(event, editor) => { }}
        onFocus={(event, editor) => { }}
        // onChange={(event, editor) => {
        //   handleChange(editor.getData())
        //   console.log(editor.getData())
        // }}
        onChange={(event, editor) => {
          const new_data = editor.getData();
          setContent(new_data)
          // editorD.current=new_data
        }}
      />
      {/* <TextArea
      ref={editorD}
      /> */}
    </Wrapper>
  );
}