import React from 'react';
import LinkButton from '../../elements/LinkButton/LinkButton';
import { Typography, Row, Col } from 'antd';
import { useLocale } from '../../hooks/useLocale';

const { Title, Paragraph } = Typography

/**
 * A box we will display when the user don't have a workspace yet...
 * 
 * @TODO Centering with Row/Col is ugly !
 * Maybe do a component for centered-like messages.
 */
const NoWorkspace = () => {

  const { t } = useLocale()

  return (
  <>
    <Row>
      <Col xs={0} sm={2} md={6} lg={8} xl={10}></Col>
      <Col xs={24} sm={20} md={12} lg={8} xl={4}>

        <Title></Title>
        <Paragraph strong>{t('workspace.no-workspace-yet.title')}</Paragraph>
        <Paragraph>{t('help.workspace.what')}</Paragraph>
        <LinkButton href={`/manage/workspaces/new`}>
          {t('workspace.no-workspace-yet.create-now')}
        </LinkButton>

      </Col>
      <Col xs={0} sm={2} md={6} lg={8} xl={10}></Col>
    </Row>
  </>)
}

export default NoWorkspace