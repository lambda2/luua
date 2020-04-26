
import Link from 'next/link';
import { Menu, Dropdown, Button } from 'antd';
import routes from '../../routes/manage'
import { useLocale } from "../../hooks/useLocale";
import UserAvatar from '../UserAvatar/UserAvatar';
import PrimaryLink from '../PrimaryLink/PrimaryLink';
// import './UserMenuDropdown.module.less'

const { users } = routes

const UserMenuDropdown = ({ user }: {user: AuthedUser | null}) => {

  const { t } = useLocale()

  if (!user) {

    return (
      <PrimaryLink {...users.login()}>{t('menu.sign-in')}</PrimaryLink>
    );
  }

  const { username, thumb_url } = user

  return (
    <Link {...users.profile()}>
      <a className="UserMenuDropdown">
        <UserAvatar name={username} size="large" src={thumb_url} />
        <span>{username}</span>
      </a>
    </Link>
  );
}

export default UserMenuDropdown;
