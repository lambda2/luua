import React, { useContext } from 'react';

import times from 'lodash/times';
import icons from '../../dictionaries/icons';


interface Props {
  mission: BaseMission,
  currentUser?: AuthedUser | null
}


/**
 * This shows ALL the metadata around a mission, like location, start date etc...
 * This is used on the side of a mission page
 */
const MissionUserSmallBar = ({
  mission
}: Props) => {

  const {
    participant_count,
    accepted_count
  } = mission

  const available = (participant_count || 0) - (accepted_count || 0)

  return (
    <span className="MissionUserSmallBar">
      {times(accepted_count || 0, (e => <span className="slot accepted">{ icons.dot }</span>))}
      {times(available || 0, (e => <span className="slot available">{ icons.dot }</span>))}
    </span>
  )

}

export default MissionUserSmallBar