import moment from "moment"


/**
 * Returns the poll status
 */
export const statusForPoll = (poll: LightPoll) => {
  const isClosed = poll.closed_at !== null && poll.closed_at !== undefined
  const isDraft = poll.visibility === 'draft'
  const isStarted = !poll.begin_at || moment(poll.begin_at).isBefore(moment())
  const isEnded = poll.end_at && moment(poll.end_at).isBefore(moment())
  const isWaitingToStart = poll.begin_at && moment(poll.begin_at).isAfter(moment())

  if (isDraft) {
    return 'draft'
  }
  if (isClosed) {
    return 'closed'
  }
  if (isEnded) {
    return 'ended'
  }
  if (isStarted) {
    return 'started'
  }
  if (isWaitingToStart) {
    return 'waiting_to_start'
  }
}

