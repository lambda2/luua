import React, { useContext } from 'react'
import routes from 'routes/routes'
import { useLocale } from 'hooks/useLocale';
import Link from 'next/link';
import { SideMenu, Item } from 'elements/SideMenu/SideMenu';
import UserContext from 'contexts/UserContext';

interface Props {
  active?: string
}

const UserSettingsMenu = ({
  active
}: Props) => {

  const { t } = useLocale()
  const { currentUser } = useContext(UserContext)

  if (!currentUser) {
    return <></>
  }

  return (<SideMenu>
      <Item active={active} name='edit'>
        <Link {...routes.users.edit()}><a>{t('form.user.menu.edit')}</a></Link>
      </Item>
      <Item active={active} name='mails'>
        <Link {...routes.users.mails()}><a>{t('form.user.menu.mails')}</a></Link>
      </Item>
      <Item active={active} name='skills'>
        <Link {...routes.users.skills()}><a>{t('form.user.menu.skills')}</a></Link>
      </Item>
  </SideMenu>)
}

export default UserSettingsMenu
