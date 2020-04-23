import React from 'react'

import './RadioButtonGroup.module.less'

import classnames from 'classnames'
import InputFeedback from '../InputFeedback/InputFeedback';


interface Props {
    children: React.ReactNode
    value: string
    id: string
    onChange: (id: string, value: any) => void
    onBlur: (id: string, value: boolean) => void
    error?: string | string[]
    touched?: any
    label?: string | React.ReactNode
    className?: string
}

/**
 * A group of radio buttons
 */
const RadioButtonGroup: React.FC<Props> = ({
    value,
    error,
    touched,
    label,
    className,
    children
}) => {
    const classes = classnames(
        "input-field",
        {
            "is-success": value || (!error && touched), // handle prefilled or user-filled
            "is-error": !!error && touched
        },
        className
    );

    return (
        <div className={classes}>
            <fieldset>
                <legend>{label}</legend>
                {children}
                {touched && <InputFeedback error={error} />}
            </fieldset>
        </div>
    );
};
RadioButtonGroup.displayName = 'RadioButtonGroup'

export default RadioButtonGroup
