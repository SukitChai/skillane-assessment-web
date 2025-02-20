import { Button, Form, Input } from "antd";
import { TForgotPasswordProps } from "../types/login";
import { ReactElement } from "react";

const ForgotPassword = ({
  onFinish,
  setSection,
}: TForgotPasswordProps): ReactElement => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        Reset password
      </h1>
      <Form.Item
        label="Email"
        labelAlign="left"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "The input is not valid E-mail!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        Submit
      </Button>
      <a onClick={() => setSection("logIn")}>{`<  Back to login`}</a>
    </Form>
  );
};

export default ForgotPassword;
