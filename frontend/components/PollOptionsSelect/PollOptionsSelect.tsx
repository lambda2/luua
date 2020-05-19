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
      <div className="poll-options-wrapper">
        {value.filter(e => !e._destroy).map(item => (
          <div key={item.name} className="poll-options-item">
            <main>
              <b>{item.name}</b>{' - '}{item.description}
            </main>
            <aside>
              <span key="delete" onClick={() => deleteOption(item)}>{icons.delete}</span>
            </aside>
          </div>
        ))}
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