import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/app/apiClient";
import { BundleResponse } from "../../types/api/bundleResponse";
import { QueryKeys } from "./keys";

export const useBundleItemsQuery = () => {
    return useQuery([QueryKeys.bundleItems], async () => {
        const { data } = await apiClient.get<BundleResponse>("/bundle-api.json");

        // This is where you may normally want to do some additional data processing

        // Let's put in an artificial wait
        await new Promise((r) => setTimeout(r, 1000));

        return data;
    });
};
