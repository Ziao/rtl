import { FC } from "react";
import { ItemGrid } from "../../components/itemGrid/itemGrid";
import { LazyImage } from "../../components/lazyImage/lazyImage";
import { BundelItem } from "../../types/api/bundleResponse";

interface BundlePageUiProps {
    isLoading: boolean;

    // I am keeping items and the other page meta as separate props. This way, the component can be used with different
    // data sources easily, rather than wanting the entire response as a prop (which is also just a code smell - this
    // component should not have any concept of the API)
    items?: BundelItem[];

    // pageMeta?
    // headerTitle?: string;
    // headerImage?: string;

    // @todo: conver the above params to a `meta` object

    onItemClicked: (item: BundelItem) => void;
}

/**
 * Depending on the project, I could definitely see this component being further split up into smaller components.
 */
export const BundlePageUi: FC<BundlePageUiProps> = ({ isLoading, items, onItemClicked }) => {
    return (
        <>
            {/*Todo: extract into component*/}
            {/*<header className="flex items-center relative p-12 pb-0 2xl:container">*/}
            {/*    /!*<div className="2xl:container">*!/*/}
            {/*    {headerImage && <LazyImage ratio={5} src={headerImage} alt={headerTitle} />}*/}
            {/*    /!*<h1 className="bg-white text-2xl font-extrabold">{headerTitle}</h1>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</header>*/}

            <div className="p-4 md:p-12 2xl:container">
                {isLoading && <span>Loading..</span>}
                {items && <ItemGrid items={items} isLoading={isLoading} onItemClicked={onItemClicked} />}
            </div>
        </>
    );
};
