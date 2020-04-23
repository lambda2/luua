// import { Upload, message } from 'antd';
// import { useState } from 'react';
// import { RcCustomRequestOptions } from 'antd/lib/upload/interface';

import { useState, ChangeEvent, ReactNode } from "react";

import './UploadAvatar.module.less'
import { Button } from "antd";
import { useField, FormikProps, FieldProps } from "formik";
import icons from "../../dictionaries/icons";


interface Props {
  multiple?: boolean
  label?: string | ReactNode
  name: string,
  imageUrl?: string,
  onDone: (files: any[] | any) => void
}

const UploadAvatar: React.FC<Props> = ({
  multiple = false,
  onDone,
  label = "Upload",
  name,
  imageUrl,
  ...props
}: Props) => {

  const [field, meta, helpers] = useField(name);
  const [removeField, removeMeta, removeHelpers] = useField(`remove_${name}`);

  const { value } = meta;
  const { setValue } = helpers;

  const removeValue = removeMeta.value;
  const setRemoveValue = removeHelpers.setValue;

  const [files, setFiles] = useState<any[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    // get the files
    let files = e.target.files || [];

    // Process each file
    const allFiles: any[] = [];

    for (let i = 0; i < files.length; i++) {

      const file = files[i];

      // Make new FileReader
      const reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        
        // Make a fileInfo Object
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if (allFiles.length == files.length) {
          // Apply Callback function
          if (multiple) {
            setValue(allFiles.map(f => f.base64));
          }
          else {
            console.log(`Setting ${name} value to `, reader.result);
            
            setValue(reader.result);
            setRemoveValue(false);
          }
        }

      }
    }

    setFiles(allFiles)

  }

  return (
    <div className="UploadAvatar">
      <div className="upload-wrapper">
        <Button>
          {label}
        </Button>
        <input
          type="file"
          {...props}
          onChange={handleChange}
          multiple={multiple}
        />
      </div>
      {!removeValue && (value || imageUrl) && <div>
        <img style={{ maxHeight: '100px', maxWidth: '100px' }} src={files.length > 0 ? value : imageUrl} alt={value} />
        {removeValue !== undefined && <span onClick={() => setRemoveValue(true)}>{icons.delete}</span>}
      </div>}
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
}

export default UploadAvatar
