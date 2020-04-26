
import Link from 'next/link';
import { Menu, Dropdown, Button } from 'antd';
import routes from '../../routes/manage'
import { useLocale } from "../../hooks/useLocale";
import UserAvatar from '../UserAvatar/UserAvatar';
// import './UserMenuDropdown.module.less'

const { users } = routes

const UserMenuDropdown = ({ user }: {user: AuthedUser | null}) => {

  const { t } = useLocale()

  if (!user) {

    const menu = (
      <Menu>
        <Menu.Item key="/users/signup">
          <Link {...users.signup()}><a>{t('menu.sign-up')}</a></Link>
        </Menu.Item>
      </Menu>
    )

    return (
      <Dropdown className="UserMenuDropdown" overlay={menu}>
        <Button>
          <Link {...users.login()}><a>{t('menu.sign-in')}</a></Link>
        </Button>
      </Dropdown>
    );
  }

  const { username, thumb_url } = user

  const menu = (
    <Menu>
      <Menu.Item key="locale">
        {/* <LangSelect currentLanguage={i18n.language} /> */}
      </Menu.Item>
    </Menu>
  )
  

  return (
    <Dropdown className="UserMenuDropdown" overlay={menu}>
      <Button type="link">
        <Link {...users.profile()}>
          <a>
            <UserAvatar name={username} size="large" src={thumb_url} />
            <span>{username}</span>
          </a>
        </Link>
      </Button>
    </Dropdown>
  );
}

export default UserMenuDropdown;
