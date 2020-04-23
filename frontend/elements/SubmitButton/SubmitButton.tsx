import React from 'react'
import { SubmitButton as OriginalButton } from 'formik-antd'
import { useLocale } from '../../hooks/useLocale';


interface Props {
    isSubmitting?: boolean
    dirty?: boolean
    isValid?: boolean
    submitCount?: number
    label?: string
}

/**
 * Our own submit button
 */
const SubmitButton: React.FC<Props> = ({
    isSubmitting = false,
    dirty = false,
    isValid = true,
    submitCount = 0,
    label
}) => {

    const { t } = useLocale()
    const savedOrErrorsLabel = (isValid ? t('form.saved') : t('form.has-errors'))
    const submittedLabel = (dirty ?
        t('form.save-changes') :
        (submitCount > 0 ? savedOrErrorsLabel : (label || t('form.submit')))
    )

    return (
        <OriginalButton>
            {isSubmitting ? t('form.submitting') : submittedLabel }
        </OriginalButton>
    );
};

SubmitButton.displayName = 'SubmitButton'

export default SubmitButton