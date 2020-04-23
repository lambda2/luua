import React from 'react'
import classNames from 'classnames';
import styles from './Title.module.css'


interface Props {
}

/**
 * Our custom heading
 */
const Title: React.FC<Props> = ({
  children,
}) => {

  return (
    <h1 className={styles.Title}>{children}</h1>
  );
};

Title.displayName = 'Title'

export default Title