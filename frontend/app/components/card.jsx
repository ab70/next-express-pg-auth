import React from 'react';
import { Avatar, Card } from 'antd';
import dayjs from 'dayjs';
import { EyeOutlined } from '@ant-design/icons';
const { Meta } = Card;

function UserCard({ user, modalVisible, view }) {
    const action = [
        <EyeOutlined key="view" onClick={() => view(user)} />,
    ];
    return (
        <Card
            style={{ width: 300 }}
            actions={modalVisible === true ? [] : action}
        >
            <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={user?.userName}
                description={
                    <>
                        <p>Email: {user?.email}</p>
                        <p>View Count: {user?.ViewCount?.viewCount || user?.totalViews || 0}</p>
                        <p>Registered on: {dayjs(user?.createdAt).format("DD/MM/YY")}</p>
                    </>
                }
            />
        </Card>
    );
}

export default UserCard;