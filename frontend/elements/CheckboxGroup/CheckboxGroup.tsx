import React, { ReactElement } from 'react'

// import './CheckboxGroup.module.less'

import classnames from 'classnames'
import InputFeedback from '../InputFeedback/InputFeedback';


interface Props {
    children: React.ReactNode
    value: string[]
    id: string
    onChange: (id: string, value: any) => void
    onBlur: (id: string, value: boolean) => void
    error?: string | string[]
    touched?: any
    label?: string | React.ReactNode
    className?: string
}

/**
 * A group of checkbox, setting value as an array
 */
const CheckboxGroup: React.FC<Props> = (props) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.currentTarget;
        let valueArray = [...props.value] || [];

        if (target.checked) {
            valueArray.push(target.id);
        } else {
            valueArray.splice(valueArray.indexOf(target.id), 1);
        }

        props.onChange(props.id, valueArray);
    };

    const handleBlur = () => {
        // take care of touched
        props.onBlur(props.id, true);
    };

    const { value, error, touched, label, className, children } = props;

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
                {React.Children.map(children as ReactElement[], (child: ReactElement) => {
                    return React.cloneElement(child, {
                        field: {
                            value: value.includes(child.props.id),
                            onChange: handleChange,
                            onBlur: handleBlur
                        }
                    });
                })}
                {touched && <InputFeedback error={error} />}
            </fieldset>
        </div>
    );
}

CheckboxGroup.displayName = 'CheckboxGroup'

export default CheckboxGroup
