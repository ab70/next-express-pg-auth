"use client"
import React from 'react'
import { get_user_Info } from '../global/_api'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import urls from '@/utils/urls';

function page() {
    // const { data, isLoadin, error } = get_user_Info()
    const { data, isLoading, error } = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const res = await axios.get(urls.baseUrl + "/user/user", {
                withCredentials: true,
            });
            console.log("data", res?.data?.data);
            return res?.data?.data;
        },
        // networkMode: "offlineFirst",
        staleTime: 1000 * 60 * 60 * 1,
        cacheTime: 1000 * 60 * 60 * 1
    });
    // const data = await axios.get(urls.baseUrl + "/user/user", { withCredentials: true });
    // console.log("data", data);
    // if (data) {
    //     console.log("data", data);
    // }
    // if (error) {
    //     console.log("error", error);
    // }
    return (
        <>
            page
        </>
    )
}

export default page