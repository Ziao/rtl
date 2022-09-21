import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/app/apiClient";
import { BundleResponse } from "../../types/api/bundleResponse";
import { QueryKeys } from "./keys";

/**
 * Retrieve a list of bundle items.
 * @param pageId The page ID to retrieve bundle items for. Complete bogus.
 * @param maxCount The maximum number of bundle items to retrieve.
 */
export const useBundleItemsQuery = (pageId: string, maxCount: number) => {
    // We compose a query key based on the parameters passed, so we never retrieve more data than we should, even
    // during re-renders
    const key = [QueryKeys.bundleItems, pageId, maxCount];

    return useQuery(key, async () => {
        // Just as an example
        // const { data } = await apiClient.get<BundleResponse>("/items", {
        //     params: {
        //         pageId,
        //         maxCount,
        //     },
        // });

        const { data } = await apiClient.get<BundleResponse>("/bundle-api.json");

        const items = data.bundelItems;

        // Just for fun, let's sort by video's first, as it gives us something to play with during tests.
        // I prefer using consts and naming our variables for every step, so it's always clear what you are working
        // with, as opposed to using a `let` and modifying things in place or overwriting it.
        const sortedItems = items.sort((item1, item2) => {
            // Both are videos, or both are not; no need to sort
            if (item1.showVideoIcon === item2.showVideoIcon) return 0;
            // Item 1 is a video, so it should be first
            if (item1.showVideoIcon) return -1;
            // Item 2 is a video, so it should be first
            return 1;
        });

        // Normally the API would do this, of course.
        const limitedItems = sortedItems.slice(0, maxCount);

        return limitedItems;
    });
};
