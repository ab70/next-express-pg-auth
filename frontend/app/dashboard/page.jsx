"use client"
import React, { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { Modal, Space, Spin, message } from 'antd';
import dynamic from 'next/dynamic';
import { get_All_User_With_ViewCount } from '../global/_api';
import axios from 'axios';
import urls from '@/utils/urls';

const UserCard = dynamic(() => import('../components/card'));

function Page() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [allUserNonAuth, setAllUserNonAuth] = useState(null);
    const { data: allUsers, isLoading: isAllUsersLoading, error: allUsersError, refetch } = get_All_User_With_ViewCount();
    // GET all user with limited details
    const getUsers = async () => {
        try {
            const data = await axios.get(urls.baseUrl + '/user/users');
            if (data?.data?.success) {
                setAllUserNonAuth(data?.data?.data);
            }
        } catch (err) {
            console.log(err);
            message.error(err?.response?.data?.message || 'Something went wrong, please try again later');
        }
    }
    // If authentication failed then non auth list will be shown
    if (allUsersError) {
        getUsers();
    }
    const handleProfileView = async (user) => {
        try {
            const responseData = await axios.get(urls.baseUrl + '/user/user/' + user?.id, { withCredentials: true });
            if (responseData?.data?.success) {
                setSelectedUser(responseData?.data?.data);
                setModalVisible(true);
                refetch();
            } else {
                message.error(responseData?.data?.message || 'Something went wrong, please try again later');
            }
        } catch (err) {
            console.log(err);
            message.error(err?.response?.data?.message || 'Something went wrong, please try again later');
        }
    };

    // Actions for the card
    const actions = [
        <EyeOutlined key="view" onClick={() => handleProfileView(user)} />,
    ];

    return (
        <>
            <Space>
                {allUsers && (
                    allUsers?.map(user => (
                        <UserCard key={user.userName} user={user} view={handleProfileView} />
                    ))
                )
                }
                {
                    allUserNonAuth && (
                        allUserNonAuth?.map(user => (
                            <UserCard key={user.userName} user={user} view={handleProfileView} />
                        ))
                    )
                }
                {
                    isAllUsersLoading && (
                        <Spin size="large" fullscreen />
                    )
                }

            </Space>

            <Modal
                title="User Information"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                {selectedUser && (
                    <UserCard key={selectedUser?.id} user={selectedUser} modalVisible={modalVisible} />
                )}
            </Modal>
        </>
    );
}

export default Page;
