
import Link from 'next/link';
import routes from 'routes/routes'
import { useLocale } from "../../hooks/useLocale";
import UserAvatar from '../UserAvatar/UserAvatar';
import PrimaryLink from '../PrimaryLink/PrimaryLink';
import classNames from 'classnames';
import Menu, { ClickParam } from 'antd/lib/menu';
import NotificationItem from 'components/NotificationItem/NotificationItem';
import UserContext from 'contexts/UserContext';
import { useContext, useState } from 'react';
import { Dropdown } from 'antd';
import icons from 'dictionaries/icons';

const { users } = routes


interface Props {
  user: AuthedUser | null
  notifications: UserNotification[] | null
}

const UserMenuDropdown = ({ user, notifications }: Props) => {

  const { t } = useLocale()
  const [visible, setVisible] = useState(false)

  if (!user) {

    return (
      <PrimaryLink {...users.login()}>{t('menu.sign-in')}</PrimaryLink>
    );
  }

  const handleMenuClick = (e: ClickParam) => {
    if (e.key === '3') {
      setVisible(false)
    }
  };

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag)
  };

  const { username, thumb_url } = user
  const { currentUser, readAllNotifications, readNotification } = useContext(UserContext)
  const onClick = (nid: string | number) => {
    readNotification(nid)
    setVisible(false)
  }

  const hasNotifications = (notifications?.length || 0) > 0 

  const menu = (
    <Menu onClick={handleMenuClick}>
      {notifications?.map(n => {
        return (<Menu.Item key={n.id}>
          <NotificationItem onClick={onClick} notification={n} onRead={readNotification as any} />
        </Menu.Item>)
      })}
      {notifications?.length === 0 && <Menu.Item disabled={true} key={'empty'}>
        {t('notifications.empty')}
      </Menu.Item>}
      <Menu.Divider />
      {<Menu.Item key={'link-to'}>
        <Link {...users.notifications()}>
          <a className="text-light text-centered">{t('notifications.see-all')}</a>
        </Link>
      </Menu.Item>}
    </Menu>
  );

  return (
    <>
      <Link key={'profile'} {...users.profile()}>
        <a className="UserMenuDropdown">
          <UserAvatar name={username} size="small" src={thumb_url} />
          <span>{username}</span>
        </a>
      </Link>
      <Dropdown
        overlay={menu}
        onVisibleChange={handleVisibleChange}
        visible={visible}
      >
        <a className={classNames("ant-dropdown-link", "UserNotification", { hasNotifications })} onClick={e => e.preventDefault()}>
          {hasNotifications ? icons.haveNotification : icons.noNotification}
          {' '}
          {hasNotifications && notifications?.length}
        </a>
      </Dropdown>

    </>
  );
}

export default UserMenuDropdown;
