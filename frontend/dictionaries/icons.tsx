import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import {
//   // faQuestionSquare,
//   faEyeSlash,
//   faLock,
//   faPencilAlt,
//   faEye,
//   faEnvelope,
//   faTimesCircle,
//   faSpinner,
//   faInbox,
//   faCheckCircle,
// } from '@fortawesome/pro-duotone-svg-icons'
// import {
//   faQuestionSquare,
//   faQuestionCircle,
//   faTrash,
// } from '@fortawesome/pro-light-svg-icons'
import {
  faQuestionCircle,
  faTrashAlt,
  faEyeSlash,
  faEye,
  faEnvelope,
  faTimesCircle,
  faCheckCircle,
} from '@fortawesome/free-regular-svg-icons'

import {
  faLock,
  faPencilAlt,
  faSpinner,
  faInbox,
} from '@fortawesome/free-solid-svg-icons'

import {
  faFacebook,
  faTwitter,
  faInstagram,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faTrashAlt,
  faEyeSlash,
  faLock,
  faPencilAlt,
  faEye,
  faEnvelope,
  faTimesCircle,
  faSpinner,
  faInbox,
  faCheckCircle,
)

export {
  faTrashAlt,
  faEyeSlash,
  faLock,
  faPencilAlt,
  faEye,
};

export default {
  "question": <FontAwesomeIcon className="menu-icon" icon={faQuestionCircle} />,
  "delete": <FontAwesomeIcon className="menu-icon" icon={faTrashAlt} />,
  // "visibility": {
  //   "hidden": <FontAwesomeIcon className="menu-icon" icon={faEyeSlash} />,
  //   "protected": <FontAwesomeIcon className="menu-icon" icon={faLock} />,
  //   "draft": <FontAwesomeIcon className="menu-icon" icon={faPencilAlt} />,
  //   "public": <FontAwesomeIcon className="menu-icon" icon={faEye} />,
  // },
  "mission_status": {
    "applied": <FontAwesomeIcon icon={faEnvelope} />,
    "rejected": <FontAwesomeIcon icon={faTimesCircle} />,
    "accepted": <FontAwesomeIcon icon={faSpinner} spin />,
    "completed": <FontAwesomeIcon icon={faInbox} />,
    "reviewed": <FontAwesomeIcon icon={faCheckCircle} />
  }
}