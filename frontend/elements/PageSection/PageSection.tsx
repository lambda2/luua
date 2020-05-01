import React, { ReactNode } from 'react'
import classNames from 'classnames';
import Title from '../Title/Title';

// import './PageSection.module.less'

interface Props {
  className?: string
  level?: '1' | '2' | '3' | '4' | '5' | '6'
  title?: string | ReactNode
}

/**
 * Our styled link
 */
const PageSection: React.FC<Props> = ({
  className,
  title,
  level = '3',
  children
}) => {

  function isTitleString(title: any): title is string {
    return typeof title === "string";
  }

  const renderTitle = () => {
    if (isTitleString(title)) {
      return <Title level={level}>{title}</Title>
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