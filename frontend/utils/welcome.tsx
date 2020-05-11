import { notification } from "antd";
import icons from "../dictionaries/icons";


const welcomeToLuua = () => {
  notification.open({
    message: 'Wouhou !',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    icon: icons.glass,
  });

}

export {
  welcomeToLuua
}

export default welcomeToLuua