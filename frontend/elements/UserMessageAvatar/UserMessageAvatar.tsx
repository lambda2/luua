import React, { ReactNode } from 'react'
import { Avatar } from 'antd';
import { cdnUrl } from 'utils/http';

type AvatarSize = "xsmall" | "small" | "default" | "large" | "xlarge" | "xxlarge"
interface Props {
  inline?: boolean
  src?: string
  name: string
  size?: number | AvatarSize
}

/**
 * Display an error properly
 */
const UserMessageAvatar = ({
  src,
  inline,
  name,
  size = 'default'
}: Props) => {

  
  const imgOrPlaceholder = src ?
    cdnUrl(src) :
    `https://robohash.org/${name || 'default'}.png?size=200x200`

  const sizes = {
    xsmall: 16,
    small: 24,
    default: 32,
    large: 48,
    xlarge: 64,
    xxlarge: 96,
  }

  const imgStyles = {
    display: inline ? 'inline-block' : 'block',
    backgroundColor: `rgba(0, 0, 0, .1)`,
    backgroundImage: `url(${imgOrPlaceholder})`,
    backgroundSize: 'cover',
    content: '',
    backgroundPosition: 'center center',
    height: (sizes[size as AvatarSize]) || size || 32,
    width: (sizes[size as AvatarSize]) || size || 32,
    borderRadius: 3
  }

  return (
    <span style={imgStyles}></span>
  )
};

UserMessageAvatar.displayName = 'UserMessageAvatar'

export default UserMessageAvatar