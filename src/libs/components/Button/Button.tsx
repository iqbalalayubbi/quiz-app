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
  name: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
};

const Button: React.FC<Properties> = ({
  htmlType,
  type,
  name,
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
        name={name}
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
