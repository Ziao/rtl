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
        <div className="grid gap-x-2 gap-y-4" style={{ gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr))" }}>
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
        <a href={item.urlAlias} target="_blank" rel="nofollow">
            <article className="flex flex-col transition-all hover:bg-gray-100 hover:-translate-y-1 transition-all duration-200 will-change-transform">
                {/* Todo: use hook to find preferred one */}
                <span href={item.urlAlias} className="link-primary">
                    {image && (
                        <LazyImage alt={item.titel} src={image.path} artificialDelayMs={index * 50} ratio={1.5} />
                    )}
                    {/*{image && <LazyImage alt={item.titel} src={item.afbeelding.afbeelding} />}*/}
                </span>
                <div className="space-y-4 p-2">
                    <div>
                        <span className="text-gray-400">{item.labelValue}</span>
                        <span href={item.urlAlias} className="link-primary">
                            <h3 className="font-display text-xl">{item.titel}</h3>
                        </span>
                    </div>
                    <p className="line-clamp-3">{item.lead}</p>
                </div>
            </article>
        </a>
    );
};
