"use client"
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import axios from "axios";
import urls from "@/utils/urls";
import { get_user_Info } from "../global/_api";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [signUp, setSignUp] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const router = useRouter()
    const [form] = Form.useForm()
    useEffect(() => {
        setLoaded(true);
    }, [])


    // post login form or signup form
    const handleSubmit = async () => {
        try {
            const formData = form.getFieldsValue()
            console.log("formData", formData);
            const url = signUp ? "/auth/signup" : "/auth/signin";
            const response = await axios.post(`${urls.baseUrl}${url}`, formData);
            if (response?.data?.success) {
                form.resetFields()
                router.push("/dashboard")
                return message.success(response?.data?.message)
            }
            return message.error(response?.data?.message)
        } catch (err) {
            console.log(err)
            return message.error(err?.response?.data?.message || 'Something went wrong, please try again later')
        }
    }

    return (
        <>
            {
                loaded ? (
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
                                // name="login"
                                initialValues={{ remember: true }}
                                // onFinish={onFinish}
                                form={form}
                            >
                                {
                                    signUp && (

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
                                    )
                                }

                                <Form.Item
                                    name="email"
                                    hasFeedback
                                    rules={[
                                        { type: 'email', message: 'The input is not valid E-mail!' },
                                        { required: true, message: "Please input your email!" },
                                    ]}
                                >
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="User Email"
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
                                        // htmlType="submit"
                                        onClick={handleSubmit}
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
                ) : <Spin />
            }
        </>

    );
};

export default LoginForm;