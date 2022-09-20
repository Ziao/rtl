import { FC } from "react";
import { useBundleItemsQuery } from "../../hooks/queries/bundleItems";
import { BundelItem } from "../../types/api/bundleResponse";
import { BundlePageUi } from "./bundlePageUi";

/**
 * I like to separate complex components into two parts
 * - One for logic and gathering data
 * - One for rendering the UI and handling events (postfixed with "..Ui")
 * This way, things stay easily testable and it helps in keeping components small and concise.
 * For smaller components, such as buttons, this is often overkill. It's probably even be overkill in this situation,
 * but hey - you asked about my style :)
 */
export const BundlePage: FC = () => {
    const { data, isLoading } = useBundleItemsQuery("uitschieters-2018", 25);

    const onItemClicked = (item: BundelItem) => {
        // Maybe do some tracking here, open a modal, etc
        location.href = item.urlAlias;
    };

    return <BundlePageUi items={data} isLoading={isLoading} onItemClicked={onItemClicked} />;
};
