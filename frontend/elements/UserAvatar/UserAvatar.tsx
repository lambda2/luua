import React, { ReactNode } from 'react'
import { Avatar } from 'antd';
import { cdnUrl } from '../../utils/http';

interface Props {
  src?: string
  name: string
  size?: number | "small" | "large" | "default"
}

/**
 * Display an error properly
 */
const UserAvatar = ({
  src,
  name,
  size = 'default'
}: Props) => {

  
  const imgOrPlaceholder = src ?
    cdnUrl(src) :
    `https://robohash.org/${name || 'default'}.png?size=200x200`

  const sizes = {
    small: 24,
    default: 32,
    large: 64
  }

  const imgStyles = {
    maxHeight: (sizes[size as "small" | "large" | "default"]) || size || 32,
    maxwidth: (sizes[size as "small" | "large" | "default"]) || size || 32,
    borderRadius: 3,
    marginRight: '.3em'
  }

  return (
    <img style={imgStyles} src={imgOrPlaceholder} />
  )
};

UserAvatar.displayName = 'UserAvatar'

export default UserAvatar