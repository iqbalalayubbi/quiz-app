import { ButtonStatus } from "../types/types";
import { DefaultButtonData } from "../constants/constants";
import { Colors } from "~/libs/enums/enums";

const setButtonData = (type: string): ButtonStatus => {
  let buttonData: ButtonStatus = DefaultButtonData;

  switch (type) {
    case "primary":
      buttonData = {
        // base
        defaultBg: Colors.PRIMARY,
        defaultBorderColor: Colors.PRIMARY,
        defaultColor: Colors.WHITE,

        // hover
        defaultHoverBg: Colors.TRANSPARENT,
        defaultHoverBorderColor: Colors.SECONDARY,
        defaultHoverColor: Colors.PRIMARY,

        // active
        defaultActiveBg: Colors.PRIMARY,
        defaultActiveBorderColor: Colors.SECONDARY,
        defaultActiveColor: Colors.WHITE,
      };
      break;
    case "secondary":
      buttonData = {
        // base
        defaultBg: Colors.SECONDARY,
        defaultBorderColor: Colors.SECONDARY,
        defaultColor: Colors.WHITE,

        // hover
        defaultHoverBg: Colors.TRANSPARENT,
        defaultHoverBorderColor: Colors.PRIMARY,
        defaultHoverColor: Colors.PRIMARY,

        // active
        defaultActiveBg: Colors.SECONDARY,
        defaultActiveBorderColor: Colors.PRIMARY,
        defaultActiveColor: Colors.WHITE,
      };
      break;
    default:
      break;
  }

  return buttonData;
};

export { setButtonData };
