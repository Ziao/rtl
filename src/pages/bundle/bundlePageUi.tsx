import { FC } from "react";
import { ItemGrid } from "../../components/itemGrid/itemGrid";
import { BundelItem } from "../../types/api/bundleResponse";

interface ArticlesPageUiProps {
    isLoading: boolean;

    // I am keeping items and the other page meta separate, as I could see something like this coming from
    // different endpoints in the future. Additionally, this way, the component can be used with different data sources.
    bundleItems?: BundelItem[];
    // pageMeta
}

/**
 * Depending on the project, I could definitely see this component being further split up into smaller components.
 * @param isLoading
 * @param bundleItems
 * @constructor
 */
export const BundlePageUi: FC<ArticlesPageUiProps> = ({ isLoading, bundleItems }) => {
    return (
        <div className="xcontainer p-10">
            {isLoading && <span>Loading..</span>}
            {bundleItems && <ItemGrid items={bundleItems} isLoading={isLoading} onItemClicked={() => {}} />}
        </div>
    );
};
