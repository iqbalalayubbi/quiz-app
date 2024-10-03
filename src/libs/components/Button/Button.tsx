import { ConfigProvider, Button as ButtonAntd } from "antd";
import styles from "./styles.module.css";
import {
  type ButtonStatus,
  type HtmlInputTypes,
  type ButtonTypes,
} from "./libs/types/types";
import { setButtonData } from "./libs/helpers/helpers";

type Properties = {
  htmlType: HtmlInputTypes;
  type: ButtonTypes;
  label: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
};

const Button: React.FC<Properties> = ({
  htmlType,
  type,
  label,
  onClick,
  loading,
}) => {
  const buttonData: ButtonStatus = setButtonData(type);

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: buttonData,
        },
      }}
    >
      <ButtonAntd
        className={styles["button"]}
        onClick={onClick}
        htmlType={htmlType}
        loading={loading}
        shape="round"
      >
        {label}
      </ButtonAntd>
    </ConfigProvider>
  );
};

export { Button };
