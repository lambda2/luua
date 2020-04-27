import React, { useContext } from 'react';
import NotificationItem from '../NotificationItem/NotificationItem';
import { List } from 'antd';
import PageSection from '../../elements/PageSection/PageSection';
import { useLocale } from '../../hooks/useLocale';

interface Props {
  data: UserNotification[],
  onRead: (id: string | number) => Promise<void>
}

const NotificationList = ({ data, onRead }: Props) => {

  const { t } = useLocale()
  
  return (
  <>
      <PageSection>
        <List
          itemLayout="vertical"
          size="default"
          dataSource={data}
          renderItem={(item: UserNotification) => <NotificationItem onRead={onRead} notification={item} />}
        />
      </PageSection>
  </>)
}

export default NotificationList