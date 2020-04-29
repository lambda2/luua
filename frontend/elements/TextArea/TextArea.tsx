import { List, Tag } from "antd";
import { useField } from "formik";
import icons from "../../dictionaries/icons";
import { useLocale } from "../../hooks/useLocale";
import MarkdownContent from "../../elements/MarkdownContent/MarkdownContent";
// import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

import ReactMde from "react-mde";
import { useState } from "react";


interface Props {
  name: string,
}

const TextArea = ({
  name,
  ...props
}: Props) => {

  const { t } = useLocale()
  const [field, meta, helpers] = useField<string>(name);
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const { value } = meta;
  const { setValue } = helpers;

  // const converter = new Showdown.Converter({
  //   tables: true,
  //   simplifiedAutoLink: true,
  //   strikethrough: true,
  //   tasklists: true
  // });

  return (
    <div className="TextArea">
      <div className="container">
        <ReactMde
          value={value}
          onChange={setValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(<MarkdownContent content={markdown} />)
          }
        />
      </div>
    </div>
  );
}

export default TextArea