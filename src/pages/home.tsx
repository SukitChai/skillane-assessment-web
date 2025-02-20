import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Upload,
} from "antd";
import { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callGetMe, callUpdateUser } from "../services/user.service";
import { TUpdateUserBody } from "../types/login";

const Home = (): ReactElement => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["/getMe"],
    queryFn: () => callGetMe(),
    staleTime: Infinity,
  });

  const callMutateUser = useMutation<
    AxiosResponse<any>,
    AxiosError<{ message: string }, any>,
    FormData
  >({
    mutationKey: ["updateUser"],
    mutationFn: (body: FormData) => callUpdateUser(body),
  });

  if (data) {
    form.setFieldsValue({
      email: data.data.email,
      identifyNumber: data.data.identifyNumber,
      mobileNumber: data.data.mobileNumber,
      dob: data.data.dob ? dayjs(data.data.dob) : null,
      file: null,
    });
  }

  const onFinish = async (values: TUpdateUserBody) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof Date) {
        value = value.toISOString();
      }
      formData.append(key, value);
    });

    if (fileList.length) {
      formData.append("profileImage", fileList[0]["originFileObj"]);
    }
    callMutateUser.mutate(formData, {
      onSuccess: () => {
        message.success("Update user profile success");
        refetch();
        setFileList([]);
      },
      onError: (error) => {
        message.error(error?.response?.data.message);
      },
    });
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col className="home">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "1rem",
              }}
            >
              <h1 style={{ marginBottom: "1rem" }}>Profile</h1>
              {isSuccess && (
                <Avatar size={75} src={data?.data?.imageUrl || null} />
              )}
            </div>
            <Form.Item
              label="Email"
              labelAlign="left"
              name="email"
              initialValue={data?.data.email || ""}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Id card"
              labelAlign="left"
              name="identifyNumber"
              initialValue={data?.data.identifyNumber || ""}
              rules={[
                {
                  required: true,
                  message: "Please input your identify number!",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Identify number must contain digits only.",
                },
                {
                  validator: (_, value) =>
                    value && value.length === 13
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "Identify number must be exactly 13 digits."
                          )
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
                {
                  required: true,
                  message: "Please input your mobile number!",
                },
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
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Image" labelAlign="left" name="file">
              <Upload
                style={{ width: "100%" }}
                listType="picture"
                accept="image/*"
                maxCount={1}
                fileList={fileList}
                onChange={(file) => {
                  setFileList(file?.fileList as any);
                }}
              >
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", marginBottom: "1rem" }}
            >
              Submit
            </Button>
            <Button danger style={{ width: "100%" }} onClick={logOut}>
              Log out
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
