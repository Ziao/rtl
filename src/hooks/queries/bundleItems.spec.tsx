import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { FC, PropsWithChildren } from "react";
import { act } from "react-dom/test-utils";
import { apiClient } from "../../lib/app/__mocks__/apiClient";
import { queryClient } from "../../lib/app/queryClient";
import { useBundleItemsQuery } from "./bundleItems";

jest.mock("../../lib/app/apiClient.ts");

// Todo: probably move this to a more generic, reusable place
const wrapper: FC<PropsWithChildren> = ({ children }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe("bundleItemsQuery", () => {
    afterEach(() => {
        apiClient.reset();
    });

    it("calls the correct endpoint", () => {
        renderHook(() => useBundleItemsQuery("endpointTest", 100), {
            wrapper: ({ children }) => {
                return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
            },
        });

        // expect(mockAxios.get).toHaveBeenCalledWith("/items?pageId=topOneMillion&maxCount=100");
        expect(apiClient.get).toHaveBeenCalledWith("/bundle-api.json");
    });

    it("limits results to maxCount", async () => {
        const { result } = renderHook(() => useBundleItemsQuery("maxCountTest", 12), {
            wrapper,
        });

        // Resolve the API call
        act(() => {
            apiClient.mockResponse({
                data: {
                    bundelItems: Array(100).fill({}),
                },
            });
        });

        // Wait for the query to finish
        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data?.length).toBe(12);
    });

    it("sorts videos to the beginning", async () => {
        const { result } = renderHook(() => useBundleItemsQuery("sortingTest", 12), {
            wrapper,
        });

        // Resolve the API call
        act(() => {
            apiClient.mockResponse({
                data: {
                    bundelItems: [
                        { showVideoIcon: false },
                        { showVideoIcon: true },
                        { showVideoIcon: false },
                        { showVideoIcon: true },
                    ],
                },
            });
        });

        // Wait for the query to finish
        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual([
            { showVideoIcon: true },
            { showVideoIcon: true },
            { showVideoIcon: false },
            { showVideoIcon: false },
        ]);
    });
});
