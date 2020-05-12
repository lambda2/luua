import React from 'react'


interface Props {
  count?: string | number
}

/**
 * Our own submit button
 */
const Badge: React.FC<Props> = ({
  children,
  count
}) => {

  return (
    <span className="Badge">
      {count}{children}
    </span>
  );
};

Badge.displayName = 'Badge'

export default Badge