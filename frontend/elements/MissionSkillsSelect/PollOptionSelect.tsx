import { useState, ChangeEvent, ReactNode } from "react";
import { useField } from "formik";
import icons from "../../dictionaries/icons";
import { useLocale } from "../../hooks/useLocale";
import List from "elements/List/List";
import PollOptionsModal from "components/PollOptionsModal/PollOptionsModal";


interface PollOption {
  id?: number
  poll_id?: number
  name?: string
  description?: string
  icon?: string
  _destroy?: boolean
}

interface Props {
  addLabel?: string,
  modalLabel?: string,
  name: string,
}

const PollOptionsSelect = ({
  modalLabel,
  addLabel,
  name,
  ...props
}: Props) => {

  const { t } = useLocale()
  const [field, meta, helpers] = useField <PollOption[]>(name);

  const { value } = meta;
  const { setValue } = helpers;

  const deleteOption = (skill: PollOption) => {
    if (skill.id) {
      setValue([
        ...value.filter(e => e.id !== skill.id),
        {...skill, ...{ _destroy: true }}
      ])
    } else {
      setValue(value.filter(e => e.name !== skill.name))
    }
  }

  const handleOk = (e: PollOption) => {
    setValue([...value, e])
  };

  const handleCancel = () => {
  };

  return (
    <div className="PollOptionsSelect">
      <div className="skills-wrapper">
        <List
          itemLayout="horizontal"
          dataSource={value.filter(e => !e._destroy)}
          key='name'
          renderItem={item => (
            <div key={item.name}>
              <p>
                {item.name}
                <span key="delete" onClick={() => deleteOption(item)}>{icons.delete}</span>
              </p>
            </div>
          )}
        />
        <hr />
        <PollOptionsModal
          onSubmit={handleOk}
          onCancel={handleCancel}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
}

export default PollOptionsSelect