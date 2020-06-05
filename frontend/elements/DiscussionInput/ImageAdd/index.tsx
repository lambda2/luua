import { EditorState } from "react-draft-wysiwyg"
import { useState, ChangeEvent } from "react"
import { Popover, Button } from "antd"
import icons from "dictionaries/icons"


interface Props {
  editorState: EditorState,
  onChange: any
  modifier: any
}
const ImageAdd = ({
  editorState,
  onChange,
  modifier
}: Props) => {

  const [url, setUrl] = useState('')
  const [open, setOpen] = useState(false)



  const hide = () => {
    setOpen(false);
  };

  const handleVisibleChange = (visible: boolean) => {
    setOpen(visible);
  };


  const addImage = () => {
    onChange(modifier(editorState, url));
  };

  const changeUrl = (evt: ChangeEvent<HTMLInputElement>) => {
    setUrl(evt.target.value)
  }

  const content = <div className="DiscussionInputAddImage">
    <input
      type="text"
      placeholder="Paste the image url …"
      // className={styles.addImageInput}
      onChange={changeUrl}
      value={url}
    />
    <button
      // className={styles.addImageConfirmButton}
      type="button"
      onClick={addImage}
    >
      Add
    </button>
  </div>


  return (
    <div className="DiscussionInputButtonWrapper">
      <Popover
        content={content}
        title=""
        trigger="click"
        visible={open}
        onVisibleChange={handleVisibleChange}
      >
        <button className="DiscussionInputButton">
          {icons.image}
        </button>
      </Popover>
    </div>
  );
}

export default ImageAdd