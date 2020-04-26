import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  // faQuestionSquare,
  faEyeSlash,
  faLockAlt,
  faPencil,
  faEye,
} from '@fortawesome/pro-duotone-svg-icons'
import {
  faQuestionSquare,
  faQuestionCircle,
  faTrash,
} from '@fortawesome/pro-light-svg-icons'

import {
  faFacebook,
  faTwitter,
  faInstagram,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faQuestionSquare,
  faTrash,
  faEyeSlash,
  faLockAlt,
  faPencil,
  faEye,
)

export {
  faQuestionSquare,
  faTrash,
  faEyeSlash,
  faLockAlt,
  faPencil,
  faEye,
};

export default {
  "question": <FontAwesomeIcon className="menu-icon" icon={faQuestionCircle} />,
  "delete": <FontAwesomeIcon className="menu-icon" icon={faTrash} />,
  "visibility": {
    "hidden": <FontAwesomeIcon className="menu-icon" icon={faEyeSlash} />,
    "protected": <FontAwesomeIcon className="menu-icon" icon={faLockAlt} />,
    "draft": <FontAwesomeIcon className="menu-icon" icon={faPencil} />,
    "public": <FontAwesomeIcon className="menu-icon" icon={faEye} />,
  },
}