import urls from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export function queryFunction(queryKey, endpoint, staleTime) {
    return useQuery({
        queryKey: [queryKey],
        queryFn: async () => {
            const res = await axios.get(urls.baseUrl + endpoint, {
                withCredentials: true,
            });
            console.log("data", res?.data?.data);
            return res?.data?.data ;
        },
        // networkMode: "offlineFirst",
        staleTime: staleTime || 1000 * 60 * 60 * 1,
        cacheTime: 1000 * 60 * 60 * 1
    });
}
export function get_user_Info() {
    return queryFunction('userInfo', '/user/user', 1000 * 60 * 60 * 3);
}
