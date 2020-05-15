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
  faComments,
  faClock,
  faPaperPlane,
  faLightbulb,
} from '@fortawesome/free-regular-svg-icons'

import {
  faLock,
  faPencilAlt,
  faSpinner,
  faInbox,
  faGlobeEurope,
  faMapMarkerAlt,
  faMapPin,
  faPen,
  faWrench,
  faUser,
  faDotCircle,
  faGlassCheers,
  faChevronUp,
  faChevronDown,
  faPlus,
  faBug,
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

const isEmoji = (str: string): boolean => {
  return str.match(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/) !== null
}

export {
  faTrashAlt,
  faEyeSlash,
  faLock,
  faPencilAlt,
  faEye,
  isEmoji,
};

export default {
  "question": <FontAwesomeIcon className="menu-icon" icon={faQuestionCircle} />,
  "delete": <FontAwesomeIcon className="menu-icon" icon={faTrashAlt} />,
  "edit": <FontAwesomeIcon className="menu-icon" icon={faPen} />,
  "skills": <FontAwesomeIcon className="menu-icon" icon={faWrench} />,
  "date": <FontAwesomeIcon className="menu-icon" icon={faClock} />,
  "user": <FontAwesomeIcon className="menu-icon" icon={faUser} />,
  "dot": <FontAwesomeIcon className="menu-icon" icon={faDotCircle} />,
  "up": <FontAwesomeIcon className="menu-icon" icon={faChevronUp} />,
  "down": <FontAwesomeIcon className="menu-icon" icon={faChevronDown} />,
  "plus": <FontAwesomeIcon className="menu-icon" icon={faPlus} />,
  "send": <FontAwesomeIcon className="menu-icon" icon={faPaperPlane} />,
  "bug": <FontAwesomeIcon className="menu-icon" icon={faBug} />,
  "idea": <FontAwesomeIcon className="menu-icon" icon={faLightbulb} />,
  "glass": <FontAwesomeIcon className="menu-icon" icon={faGlassCheers} />,
  "loading": < FontAwesomeIcon icon ={faSpinner} spin />,
  "comments": <FontAwesomeIcon className="menu-icon" icon={faComments} />,
  "visibility": {
    "hidden": <FontAwesomeIcon className="menu-icon" icon={faEyeSlash} />,
    "protected": <FontAwesomeIcon className="menu-icon" icon={faLock} />,
    "draft": <FontAwesomeIcon className="menu-icon" icon={faPencilAlt} />,
    "public": <FontAwesomeIcon className="menu-icon" icon={faGlobeEurope} />,
  },
  "location": {
    "physical": <FontAwesomeIcon className="menu-icon" icon={faMapPin} />,
    "online": <FontAwesomeIcon className="menu-icon" icon={faGlobeEurope} />,
    "location": <FontAwesomeIcon className="menu-icon" icon={faMapMarkerAlt} />,
  },
  "mission_status": {
    "applied": <FontAwesomeIcon icon={faEnvelope} />,
    "rejected": <FontAwesomeIcon icon={faTimesCircle} />,
    "canceled": <FontAwesomeIcon icon={faTimesCircle} />,
    "accepted": <FontAwesomeIcon icon={faSpinner} spin />,
    "completed": <FontAwesomeIcon icon={faInbox} />,
    "reviewed": <FontAwesomeIcon icon={faCheckCircle} />
  }
}