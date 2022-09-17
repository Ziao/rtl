import { FC } from "react";
import { ItemGrid } from "../../components/itemGrid/itemGrid";
import { LazyImage } from "../../components/lazyImage/lazyImage";
import { BundelItem } from "../../types/api/bundleResponse";

interface BundlePageUiProps {
    isLoading: boolean;

    // I am keeping items and the other page meta separate, as I could see something like this coming from
    // different endpoints in the future. Additionally, this way, the component can be used with different data sources.
    bundleItems?: BundelItem[];

    // pageMeta

    headerTitle: string;
    headerImage?: string;
}

/**
 * Depending on the project, I could definitely see this component being further split up into smaller components.
 * @param isLoading
 * @param bundleItems
 * @constructor
 */
export const BundlePageUi: FC<BundlePageUiProps> = ({ isLoading, headerImage, headerTitle, bundleItems }) => {
    return (
        <>
            {/*Todo: extract into component*/}
            {/*<header className="flex items-center relative p-12 pb-0 2xl:container">*/}
            {/*    /!*<div className="2xl:container">*!/*/}
            {/*    {headerImage && <LazyImage ratio={5} src={headerImage} alt={headerTitle} />}*/}
            {/*    /!*<h1 className="bg-white text-2xl font-extrabold">{headerTitle}</h1>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</header>*/}

            {/*<div className="2xl:container space-y-12">*/}
            <div className="p-4 md:p-12 2xl:container">
                {isLoading && <span>Loading..</span>}
                {bundleItems && <ItemGrid items={bundleItems} isLoading={isLoading} onItemClicked={() => {}} />}
            </div>
        </>
    );
};
