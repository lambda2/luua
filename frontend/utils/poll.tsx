import moment from "moment"


/**
 * Returns the poll status
 */
export const statusForPoll = (poll: LightPoll) => {
  const isClosed = poll.closed_at !== null && poll.closed_at !== undefined
  const isDraft = poll.visibility === 'draft'
  const isStarted = !poll.begin_at || moment(poll.begin_at).isAfter(moment())
  const isEnded = poll.end_at && moment(poll.end_at).isBefore(moment())

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
}

