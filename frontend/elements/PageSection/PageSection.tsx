import React, { ReactNode } from 'react'
import classNames from 'classnames';

// import './PageSection.module.less'

interface Props {
  className?: string
  title?: string | ReactNode
}

/**
 * Our styled link
 */
const PageSection: React.FC<Props> = ({
  className,
  title,
  children
}) => {

  function isTitleString(title: any): title is string {
    return typeof title === "string";
  }

  const renderTitle = () => {
    if (isTitleString(title)) {
      return <h2>{title}</h2>
    } else {
      return title
    }
  }

  return (
    <section className={classNames("page-section", className)}>
      {title && renderTitle()}
      {children}
    </section>
  );
};

PageSection.displayName = 'PageSection'

export default PageSection