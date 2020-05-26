import React from 'react'
import { PresetColorType } from 'antd/lib/_util/colors';
import classNames from 'classnames';


interface Props {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Our own tag element
 */
const Tag: React.FC<Props> = ({
  children,
  className,
  style
}) => {

  return (
    <span className={classNames("Tag", className)} style={style}>
      {children}
    </span>
  );
};

Tag.displayName = 'Tag'

export default Tag