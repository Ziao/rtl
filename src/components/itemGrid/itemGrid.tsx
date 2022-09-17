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
        <div
            className="grid gap-x-4 gap-y-8 xgrid-flow-col"
            style={{ gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr))" }}
        >
            {/*<div className="grid gap-4 grid-flow-col grid-rows-5 auto-cols-auto" style={{ width: "1000px" }}>*/}
            {items?.map((item, i) => (
                <ItemGridItem key={item.id} item={item} onClick={() => onItemClicked(item)} index={i} />
            ))}
        </div>
    );
};

interface ItemGridItemProps {
    item: BundelItem;
    index: number;
    onClick: () => void;
}
export const ItemGridItem: FC<ItemGridItemProps> = ({ item, index, onItemClicked }) => {
    const image = item.afbeelding.crops.find((crop) => crop.type === CropType.SquareSmall);

    return (
        <article className="flex flex-col space-y-4">
            {/* Todo: use hook to find preferred one */}
            <a href={item.urlAlias} target="_blank" rel="nofollow" className="link-primary">
                {image && <LazyImage alt={item.titel} src={image.path} artificialDelayMs={index * 50} />}
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
