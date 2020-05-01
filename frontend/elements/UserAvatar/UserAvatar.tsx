import React, { ReactNode } from 'react'
import { Avatar } from 'antd';
import { cdnUrl } from '../../utils/http';

type AvatarSize = "small" | "default" | "large" | "xlarge" | "xxlarge"
interface Props {
  src?: string
  name: string
  size?: number | AvatarSize
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
    large: 48,
    xlarge: 64,
    xxlarge: 96,
  }

  const imgStyles = {
    maxHeight: (sizes[size as AvatarSize]) || size || 32,
    maxWidth: (sizes[size as AvatarSize]) || size || 32,
    borderRadius: 3
  }

  return (
    <img style={imgStyles} src={imgOrPlaceholder} />
  )
};

UserAvatar.displayName = 'UserAvatar'

export default UserAvatar