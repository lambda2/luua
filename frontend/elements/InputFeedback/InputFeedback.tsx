import React from 'react'

import './InputFeedback.module.less'

import classnames from 'classnames'


interface Props {
    error?: string | React.ReactNode
}

/**
 * Just a basic container
 * @param className The class to add
 */
const InputFeedback: React.FC<Props> = ({ error }) =>
    error ? <div className={classnames("input-feedback")}>{error}</div> : null;

InputFeedback.displayName = 'InputFeedback'

export default InputFeedback
