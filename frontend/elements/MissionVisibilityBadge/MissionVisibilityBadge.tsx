import React, { ReactNode } from 'react'
import Tag, { TagProps } from 'antd/lib/tag';
import icons from 'dictionaries/icons';
import { useLocale } from 'hooks/useLocale';
import { Tooltip } from 'antd';


interface Props extends TagProps {
  visibility: MissionVisibility,
  workspaceName?: string
}

const colors = {
  hidden: '#5e81ac',
  protected: '#ebcb8b',
  draft: '#b48ead',
  public: '#a3be8c',
}

/**
 * A badge to show the visibility of a mission
 */
const MissionVisibilityBadge: React.FC<Props> = ({
  visibility,
  workspaceName,
  ...props
}) => {

  const { t } = useLocale()

  return (
    <Tag style={{ fontSize: '.7rem' }} className="visibility-badge" color={colors[visibility]} {...props}>
      <Tooltip title={t(`form.mission.visibilities.${visibility}.description`, { name: workspaceName || 'votre espace' })}>
        <span>{t(`form.mission.visibilities.${visibility}.title`)}</span>
      </Tooltip>
    </Tag>
  );
};

MissionVisibilityBadge.displayName = 'MissionVisibilityBadge'

export default MissionVisibilityBadge