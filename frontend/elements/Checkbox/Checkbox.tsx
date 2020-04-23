import React from 'react'

// import './Checkbox.module.less'

import classnames from 'classnames'
import InputFeedback from '../InputFeedback/InputFeedback';


interface Props {
    className?: string
    field: {
        name: any
        value: any
        onChange: any
        onBlur: any
    }
    form: any
    id: string
    label: string
}

/**
 * A checkbox component
 * @param className The class to add
 */
const Checkbox: React.FC<Props> = ({
    field: { name, value, onChange, onBlur },
    form: { errors, touched, setFieldValue },
    id,
    label,
    className,
    ...props
}) => {
    return (
        <div>
            <input
                name={name}
                id={id}
                type="checkbox"
                value={value}
                checked={value}
                onChange={onChange}
                onBlur={onBlur}
                className={classnames("radio-button", className)}
            />
            <label htmlFor={id}>{label}</label>
            {touched[name] && <InputFeedback error={errors[name]} />}
        </div>
    );
};

Checkbox.displayName = 'Checkbox'

export default Checkbox
