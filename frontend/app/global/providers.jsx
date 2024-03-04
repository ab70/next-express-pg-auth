import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
    // defaultOptions: {
    //     queries: {
    //         retry: (failureCount, error) => {
    //             if (error.response && [400, 401].includes(error.response.status)) {
    //                 if (error.response.status === 401) {
    //                     queryClient.clear()
    //                     const keyToKeep = "lang";
    //                     // Iterate through localStorage keys
    //                     for (const key in localStorage) {
    //                         if (localStorage.hasOwnProperty(key) && key !== keyToKeep) {
    //                             // Remove items that don't match the key to keep
    //                             localStorage.removeItem(key);
    //                         }
    //                     }
    //                     window.location.replace("/")
    //                 }
    //                 // Don't retry for these status codes
    //                 return false;
    //             }
    //             return true; // Retry for other errors
    //         },
    //     }
    // }

});
export default function Providers({ children }) {
    return (
        <QueryClientProvider client={queryClient} >
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
