import React from 'react'
import classNames from 'classnames';


interface Props {
  level?: '1' | '2' | '3' | '4' | '5' | '6',
  className?: string
}

/**
 * Our custom heading
 */
const Title: React.FC<Props> = ({
  children,
  className,
  level = '1',
}) => {

  switch (level) {
    case '1':
      return <h1 className={classNames("Title", className)}>{children}</h1>
    case '2':
      return <h2 className={classNames("Title", className)}>{children}</h2>
    case '3':
      return <h3 className={classNames("Title", className)}>{children}</h3>
    case '4':
      return <h4 className={classNames("Title", className)}>{children}</h4>
    case '5':
      return <h5 className={classNames("Title", className)}>{children}</h5>
    case '6':
      return <h6 className={classNames("Title", className)}>{children}</h6>
    default:
      return <h1 className={classNames("Title", className)}>{children}</h1>;
  }
};

Title.displayName = 'Title'

export default Title