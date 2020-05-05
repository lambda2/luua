import React, { useContext } from 'react';
import { Avatar } from 'antd';
import Link from 'next/link';
import find from 'lodash/find';
import { Typography } from 'antd';

import { cdnUrl } from '../../utils/http';
import momentWithLocale from '../../i18n/moment';
import routes from '../../routes/manage'
import { useLocale } from '../../hooks/useLocale';
import UserContext from '../../contexts/UserContext';

import MissionApplication from '../MissionApplication/MissionApplication';
import MissionCandidateBox from '../MissionCandidateBox/MissionCandidateBox';
import MissionSkillsForUser from '../MissionSkillsForUser/MissionSkillsForUser';

import PageSection from '../../elements/PageSection/PageSection';
import PageTitle from '../../elements/PageTitle/PageTitle';
import can from '../../utils/can';
import DiscussionForm from '../../elements/DiscussionForm/DiscussionForm';
import { create } from '../../api/message';
import { useMutation, queryCache } from 'react-query';
import UserAvatar from '../../elements/UserAvatar/UserAvatar';
import MarkdownContent from '../../elements/MarkdownContent/MarkdownContent';
import MessageList from '../MessageList/MessageList';

const { Text } = Typography;

const { explore, manage } = routes

interface Props {
  mission: LightMission,
  discussion?: LightDiscussion
  messages: Message[]
}

const MissionDiscussion = ({ mission, discussion, messages }: Props) => {

  const {
    id,
    name,
    // mission_category_id,
    physical,
    description,
    begin_at,
    end_at,
    due_at,
    organization_id,
    workspace_id,
    workspace,
    image,
    visibility,
    banner_image,
    modified_at,
    created_at,
    // modified_by,
    slug,
  } = mission

  const { currentUser } = useContext(UserContext)
  const { t, language } = useLocale()
  const moment = momentWithLocale(language as AvailableLocale)

  const sendMessage = async (content: string) => {
    if (!discussion) {
      console.error("No discussion to attatch this message !")
      return
    }

    return await create({ content, discussion_id: discussion.id }, currentUser?.jwt || '')
  }

  const [mutate] = useMutation(sendMessage, {
    onSuccess: (data) => {
      console.log("MUTATE ! onSuccess => ", data);
      
      queryCache.refetchQueries(`/api/discussions/${discussion?.id}/messages`)
    },
    onMutate: (data) => {
      console.log("MUTATE ! onMutate => ", data);
    },
    onError: (data) => {
      console.log("MUTATE ! onError => ", data);
    },
    onSettled: (data) => {
      console.log("MUTATE ! onSettled => ", data);
    }
  })

  return (
    <div className="MissionDiscussion">
      <MessageList messages={messages} />

      <DiscussionForm onSubmit={mutate}/>

    </div>
  )

}

export default MissionDiscussion