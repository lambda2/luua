import React from 'react'

// import './RadioButton.module.less'

import classnames from 'classnames'


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
 * Just a basic container
 * @param className The class to add
 */
const RadioButton: React.FC<Props> = ({
    field: { name, value, onChange, onBlur },
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
                type="radio"
                value={id} // could be something else for output?
                checked={id === value}
                onChange={onChange}
                onBlur={onBlur}
                className={classnames("radio-button")}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};


RadioButton.displayName = 'RadioButton'

export default RadioButton
