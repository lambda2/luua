// import { Upload, message } from 'antd';
// import { useState } from 'react';
// import { RcCustomRequestOptions } from 'antd/lib/upload/interface';

import { useState, ChangeEvent, ReactNode } from "react";

// import './WorkspaceLabel.module.less'
import { Button } from "antd";
import { useField, FormikProps, FieldProps } from "formik";
import { cdnUrl } from "../../utils/http";



interface Props {
  thumb_url?: string,
  name?: string
}

const WorkspaceLabel = ({ name, thumb_url }: Props) => {

  const imgOrPlaceholder = thumb_url ?
    cdnUrl(thumb_url) :
    `https://robohash.org/${name || 'default'}.png?size=200x200`

  const imgStyles = {
    maxHeight: 24,
    maxwidth: 24,
    borderRadius: 3
  }

  return (
    <span className="WorkspaceLabel">
      <img style={imgStyles} src={imgOrPlaceholder} />
      <span>{name}</span>
    </span>
  );
}

export default WorkspaceLabel
