
import Link from 'next/link';
import { Menu, Dropdown, Button } from 'antd';
import routes from '../../routes/manage'
import { useLocale } from "../../hooks/useLocale";
import UserAvatar from '../UserAvatar/UserAvatar';
import PrimaryLink from '../PrimaryLink/PrimaryLink';
import classNames from 'classnames';
// import './UserMenuDropdown.module.less'

const { users } = routes


interface Props {
  user: AuthedUser | null
  notifications: UserNotification[] | null
}

const UserMenuDropdown = ({ user, notifications }: Props) => {

  const { t } = useLocale()

  if (!user) {

    return (
      <PrimaryLink {...users.login()}>{t('menu.sign-in')}</PrimaryLink>
    );
  }

  const { username, thumb_url } = user

  return (
    <>
      <Link key={'profile'} {...users.profile()}>
        <a className="UserMenuDropdown">
          <UserAvatar name={username} size="large" src={thumb_url} />
          <span>{username}</span>
        </a>
      </Link>
      <Link key={'notifications'} {...users.notifications()}>
        <a className={classNames("UserNotification", { 'has-notifications': (notifications?.length || 0) > 0 })}>
          {notifications?.length || 0}
        </a>
      </Link>
    </>
  );
}

export default UserMenuDropdown;
