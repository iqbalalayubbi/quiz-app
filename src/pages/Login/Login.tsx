import { Form, Input, Flex } from "antd";
import { Button, Alert } from "~/libs/components/components";
import { FieldTypes } from "./libs/types/types";
import type { FormProps } from "antd";
import { USERNAME, PASSWORD } from "./libs/constants/constants";

import { TokenStorage } from "~/libs/storage/storage";
import { useNavigate, useState } from "~/libs/hooks/hooks";
import { AppRoute } from "~/libs/enums/enums";

import styles from "./styles.module.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const handleLoginUser: FormProps<FieldTypes>["onFinish"] = (values) => {
    const { username, password } = values;

    if (username === USERNAME && password === PASSWORD) {
      TokenStorage.setToken(username);
      navigate(AppRoute.ROOT);
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <Flex className={styles["main-content"]} align="center" vertical>
      <div className={styles["right-top-circles"]}>
        <div className={styles["big-circle"]}></div>
        <div className={styles["small-circle"]}></div>
      </div>
      <div className={styles["left-bottom-circles"]}>
        <div className={styles["big-circle"]}></div>
        <div className={styles["small-circle"]}></div>
      </div>

      <h1 className={styles["title"]}>Quizea</h1>
      <Flex
        className={styles["container"]}
        justify="center"
        align="center"
        vertical
      >
        <h1 className={styles["sub-title"]}>Login</h1>
        {isInvalid && (
          <Alert
            className={styles["error-alert"]}
            message="Invalid username or password"
            type="error"
            banner
          />
        )}
        <Form
          className={styles["form-login"]}
          name="form-login"
          autoComplete="off"
          onFinish={handleLoginUser}
        >
          <Form.Item<FieldTypes>
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="username" type="text" />
          </Form.Item>
          <Form.Item<FieldTypes>
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input placeholder="password" type="password" />
          </Form.Item>
          <Button htmlType="submit" type="primary" label="Login" name="login" />
        </Form>
      </Flex>
    </Flex>
  );
};

export { Login };
