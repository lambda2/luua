import React, { useContext } from 'react';
import NotificationItem from '../NotificationItem/NotificationItem';
import { List } from 'antd';
import PageSection from '../../elements/PageSection/PageSection';
import { useLocale } from '../../hooks/useLocale';

interface Props {
  data: UserNotification[]
}

const NotificationList = ({ data }: Props) => {

  const { t } = useLocale()
  
  return (
  <>
      <PageSection>
        <List
          itemLayout="vertical"
          size="default"
          dataSource={data}
          renderItem={(item: UserNotification) => <NotificationItem {...item} />}
        />
      </PageSection>
  </>)
}

export default NotificationList