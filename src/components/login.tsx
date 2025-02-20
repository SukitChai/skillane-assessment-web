import { GoogleLogin } from "@react-oauth/google";
import { Button, Form, Input } from "antd";
import { TLogInProps } from "../types/login";
import { ReactElement } from "react";

const LogIn = ({
  onFinish,
  handleSuccess,
  handleError,
  setSection,
}: TLogInProps): ReactElement => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
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
        Sign In
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

      <Form.Item
        label="Password"
        labelAlign="left"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        Submit
      </Button>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "0.5rem",
        }}
      >
        <a onClick={() => setSection("forgotPassword")}>ลืมรหัสผ่าน</a>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "0.5rem",
        }}
      >
        <a onClick={() => setSection("signUp")}>สมัครสมาชิก</a>
      </div>
    </Form>
  );
};

export default LogIn;
