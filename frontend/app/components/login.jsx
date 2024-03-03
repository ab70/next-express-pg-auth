"use client"
import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Title } = Typography;

const LoginForm = () => {
    const [signUp, setSignUp] = useState(false);
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };



    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card style={{ width: 500 }}>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    {
                        signUp && (
                            <Form.Item
                                name="email"
                                hasFeedback
                                rules={[{ required: true, message: "Please input your email!" }]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="User Email"
                                />
                            </Form.Item>
                        )
                    }

                    <Form.Item
                        name="userName"
                        hasFeedback
                        rules={[{ required: true, message: "Please input your Username!" }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        hasFeedback
                        rules={[{ required: true, message: "Please input your Password!" }]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                            style={{ marginTop: "5px", marginBottom: "5px" }}
                        >
                            {signUp ? "Sign Up" : "Log In"}
                        </Button>
                        {signUp ? "Already Have Account" : "Don't have an account!"}{" "}
                        <a onClick={() => { setSignUp(!signUp) }}>
                            {signUp ? "Login" : "Sign Up"}
                        </a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginForm;