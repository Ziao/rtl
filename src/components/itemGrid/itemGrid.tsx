import { FC } from "react";
import { BundelItem, CropType } from "../../types/api/bundleResponse";
import { LazyImage } from "../lazyImage/lazyImage";

interface ItemGridProps {
    items: BundelItem[];
    isLoading: boolean;
    onItemClicked: (item: BundelItem) => void;
}

export const ItemGrid: FC<ItemGridProps> = ({ items, isLoading, onItemClicked }) => {
    // Note: While I don't think a masonry-type layout is the best way to consume content (hard to scan), I just
    // wanted to do something different from the Boulevard site. Figured it may be a nice little use case for some logic

    return (
        // <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div
            className="grid gap-10 xgrid-flow-col"
            style={{ gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr))" }}
        >
            {/*<div className="grid gap-4 grid-flow-col grid-rows-5 auto-cols-auto" style={{ width: "1000px" }}>*/}
            {items?.map((item) => (
                <ItemGridItem key={item.id} item={item} onClick={() => onItemClicked(item)} />
            ))}
        </div>
    );
};

interface ItemGridItemProps {
    item: BundelItem;
    onClick: () => void;
}
export const ItemGridItem: FC<ItemGridItemProps> = ({ item, onItemClicked }) => {
    const image = item.afbeelding.crops.find((crop) => crop.type === CropType.SquareSmall);

    return (
        <article className="flex flex-col space-y-8">
            {/* Todo: use hook to find preferred one */}
            <a href={item.urlAlias} target="_blank" rel="nofollow" className="link-primary">
                {image && <LazyImage alt={item.titel} src={image.path} />}
                {/*{image && <LazyImage alt={item.titel} src={item.afbeelding.afbeelding} />}*/}
            </a>
            <div>
                <span className="text-base-300">{item.labelValue}</span>
                <a href={item.urlAlias} target="_blank" rel="nofollow" className="link-primary">
                    <h3 className="font-display text-xl">{item.titel}</h3>
                </a>
            </div>
            <p className="line-clamp-3">{item.lead}</p>
        </article>
    );
};
