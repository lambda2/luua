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
  faPlusSquare,
  faEnvelopeOpen,
  faThumbsUp,
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
  faLockOpen,
  faLink,
  faThumbsUp as faThumbsUpFill,
  faLocationArrow,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

import {
  faFacebook,
  faTwitter,
  faInstagram,
  faDiscord,
  faGithub,
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
  "users": <FontAwesomeIcon className="menu-icon" icon={faUsers} />,
  "dot": <FontAwesomeIcon className="menu-icon" icon={faDotCircle} />,
  "up": <FontAwesomeIcon className="menu-icon" icon={faChevronUp} />,
  "down": <FontAwesomeIcon className="menu-icon" icon={faChevronDown} />,
  "plus": <FontAwesomeIcon className="menu-icon" icon={faPlus} />,
  "plusthumb": <FontAwesomeIcon className="menu-icon" icon={faThumbsUp} />,
  "plusthumbfill": <FontAwesomeIcon className="menu-icon" icon={faThumbsUpFill} />,
  "plussquare": <FontAwesomeIcon className="menu-icon" icon={faPlusSquare} />,
  "send": <FontAwesomeIcon className="menu-icon" icon={faPaperPlane} />,
  "bug": <FontAwesomeIcon className="menu-icon" icon={faBug} />,
  "idea": <FontAwesomeIcon className="menu-icon" icon={faLightbulb} />,
  "locked": <FontAwesomeIcon className="menu-icon" icon={faLock} />,
  "glass": <FontAwesomeIcon className="menu-icon" icon={faGlassCheers} />,
  "link": <FontAwesomeIcon className="menu-icon" icon={faLink} />,
  "country": <FontAwesomeIcon className="menu-icon" icon={faMapMarkerAlt} />,
  "loading": < FontAwesomeIcon icon ={faSpinner} spin />,
  "comments": <FontAwesomeIcon className="menu-icon" icon={faComments} />,
  "visibility": {
    "hidden": <FontAwesomeIcon className="menu-icon" icon={faEyeSlash} />,
    "protected": <FontAwesomeIcon className="menu-icon" icon={faLock} />,
    "draft": <FontAwesomeIcon className="menu-icon" icon={faPencilAlt} />,
    "public": <FontAwesomeIcon className="menu-icon" icon={faGlobeEurope} />,
  },
  "anonymity": {
    "open": <FontAwesomeIcon className="menu-icon" icon={faGlobeEurope} />,
    "anonymous": <FontAwesomeIcon className="menu-icon" icon={faEyeSlash} />,
    "not_anonymous": <FontAwesomeIcon className="menu-icon" icon={faEye} />
  },
  "authentication": {
    "required": <FontAwesomeIcon className="menu-icon" icon={faLock} />,
    "not_required": <FontAwesomeIcon className="menu-icon" icon={faLockOpen} />
  },
  "reveal": {
    "always": <FontAwesomeIcon className="menu-icon" icon={faEnvelopeOpen} />,
    "on_close": <FontAwesomeIcon className="menu-icon" icon={faEnvelopeOpen} />,
    "on_vote": <FontAwesomeIcon className="menu-icon" icon={faEnvelope} />
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
  },
  "mission": {
    "status": {
      "open": <FontAwesomeIcon icon={faEnvelope} />,
      "canceled": <FontAwesomeIcon icon={faTimesCircle} />,
      "started": <FontAwesomeIcon icon={faSpinner} spin />,
      "pending": <FontAwesomeIcon icon={faInbox} />,
      "completed": <FontAwesomeIcon icon={faCheckCircle} />
    }
  },
  "poll": {
    "draft": <FontAwesomeIcon icon={faPencilAlt} />,
    "closed": <FontAwesomeIcon icon={faCheckCircle} />,
    "ended": <FontAwesomeIcon icon={faCheckCircle} />,
    "started": <FontAwesomeIcon icon={faSpinner} spin />,
  },
  "brands": {
    "twitter": <FontAwesomeIcon icon={faTwitter} />,
    "github": <FontAwesomeIcon icon={faGithub} />,
    "discord": <FontAwesomeIcon icon={faDiscord} />
  }
}