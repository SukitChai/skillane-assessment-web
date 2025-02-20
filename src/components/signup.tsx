import { Button, DatePicker, Form, Input } from "antd";
import { TSignUpProps } from "../types/login";
import { ReactElement } from "react";

const SignUp = ({ onFinish, setSection }: TSignUpProps): ReactElement => {
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
        Sign Up
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
      <Form.Item
        label="Confirm Password"
        labelAlign="left"
        name="confirmPassword"
        rules={[
          { required: true, message: "Please input your confirm password!" },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Id card"
        labelAlign="left"
        name="identifyNumber"
        rules={[
          { required: true, message: "Please input your identify number!" },
          {
            pattern: /^[0-9]+$/,
            message: "Identify number must contain digits only.",
          },
          {
            validator: (_, value) =>
              value && value.length === 13
                ? Promise.resolve()
                : Promise.reject(
                    new Error("Identify number must be exactly 13 digits.")
                  ),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mobile"
        labelAlign="left"
        name="mobileNumber"
        rules={[
          { required: true, message: "Please input your mobile number!" },
          {
            pattern: /^[0-9]+$/,
            message: "Mobile number must contain digits only.",
          },
          {
            validator: (_, value) =>
              value && value.length === 10
                ? Promise.resolve()
                : Promise.reject(
                    new Error("Mobile number must be exactly 10 digits.")
                  ),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Birth date"
        labelAlign="left"
        name="dob"
        rules={[{ required: true, message: "Please select date" }]}
      >
        <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
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

export default SignUp;
