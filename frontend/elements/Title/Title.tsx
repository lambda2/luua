import React from 'react'
import classNames from 'classnames';


interface Props {
}

/**
 * Our custom heading
 */
const Title: React.FC<Props> = ({
  children,
}) => {

  return (
    <h1 className={"Title"}>{children}</h1>
  );
};

Title.displayName = 'Title'

export default Title