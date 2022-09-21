import { FC } from "react";
import { ItemGrid } from "../../components/itemGrid/itemGrid";
import { Navbar } from "../../components/navigation/navbar";
import { BundelItem } from "../../types/api/bundleResponse";

export interface BundlePageUiProps {
    isLoading: boolean;

    // I am keeping items and the other page meta as separate props, despite the API returning them in one response.
    // This way, the component can be used with different data sources easily, rather than wanting the entire response
    // as a prop (which is a code smell - this component should not have any concept of the API)
    items?: BundelItem[];

    meta: {
        title: string;
        // image: string;
    };

    onItemClicked: (item: BundelItem) => void;
}

/**
 * Depending on the project, I could definitely see this component being further split up into smaller components.
 */
export const BundlePageUi: FC<BundlePageUiProps> = ({ isLoading, items, meta, onItemClicked }) => {
    return (
        <div className="Page">
            <Navbar title={meta.title} />

            {/*<Jumbotron />*/}

            <div className="Page_content">
                {isLoading && <span>Loading..</span>}
                {items && <ItemGrid items={items} isLoading={isLoading} onItemClicked={onItemClicked} />}
            </div>

            {/*Footer*/}
        </div>
    );
};
