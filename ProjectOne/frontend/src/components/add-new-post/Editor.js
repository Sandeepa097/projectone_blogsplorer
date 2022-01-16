import React, {useState, useEffect} from "react";
import CustomFileUpload from "../components-overview/CustomFileUpload";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput } from "shards-react";
import { AddPostStore } from "../../flux";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

const Editor = ({post, setPost}) => {
  const [content, setContent] = useState({
    title: AddPostStore.getPost().title,
    backgroundImage: AddPostStore.getPost().backgroundImage,
    body: AddPostStore.getPost().body
  })
  const [preview, setPreview] = useState({
    image: !post.backgroundImage ? '' : post.backgroundImage 
  })

  useEffect(() => {
    setPost({...post, ...content})
  }, [content])

  const onChangeContent = (html) => {
    setContent({...content, body: html})
  }
  const onChangeTitle = (text) => {
    setContent({...content, title: text})
  }
  const chooseImage = (event) => {
    setContent({...content, backgroundImage: event.target.files[0]})
    setPreview({...preview, image: URL.createObjectURL(event.target.files[0])})
  }
  const closeImage = (e) => {
    setContent({...content, backgroundImage: null})
    setPreview({...preview, image: ''})
  }

  return(
    <Card small className="mb-3">
    <CardBody>
      <Form className="add-new-post">
        <FormInput size="lg" 
                  className="mb-3" 
                  placeholder="Your Post Title" 
                  value={content.title}
                  onChange={e => onChangeTitle(e.target.value)} />
          <CustomFileUpload chooseImage={chooseImage} text="Select Background Image..." />
          {preview.image && <div>
            <img src={preview.image} alt = "" width="50px" height="50px" />
            <button onClick={(e) => closeImage(e)}><span>&times;</span></button>
          </div>}
        <br />
        <ReactQuill className="add-new-post__editor mb-1" 
                    value = {content.body}
                    placeholder="Type Your Content Here..." 
                    modules= {{
                      toolbar: {
                        container: [
                          [{'header': [1, 2, 3, false]}],
                          ['bold', 'italic', 'underline'],
                          [{'list': 'ordered'}, {'list': 'bullet'}],
                          [{'align': ''}, {'align': 'right'}, {'align': 'center'}, {'align': 'justify'}],
                          [{'color': []}]
                        ]
                      }
                    }} 
                    onChange = {onChangeContent} />
      </Form>
    </CardBody>
  </Card>
  )
};

export default Editor;
