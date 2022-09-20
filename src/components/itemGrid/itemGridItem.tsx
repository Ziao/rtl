import { FC } from "react";
import { selectPreferredItemImage } from "../../lib/util/media/selectPreferredItemImage";
import { BundelItem, CropType } from "../../types/api/bundleResponse";
import { LazyImage } from "../lazyImage/lazyImage";

interface ItemGridItemProps {
    item: BundelItem;
    index: number;
    onClick: () => void;
}

export const ItemGridItem: FC<ItemGridItemProps> = ({ item, index, onClick }) => {
    const image = selectPreferredItemImage(item, CropType.ArtikelTop);

    return (
        <a href={item.urlAlias} target="_blank" rel="nofollow">
            <article className="flex flex-col transition-all hover:bg-gray-100 hover:-translate-y-1 transition-all duration-200 will-change-transform">
                {/* Todo: use hook to find preferred one */}
                <span className="link-primary">
                    {image && (
                        <LazyImage alt={item.titel} src={image.path} artificialDelayMs={index * 50} ratio={1.5} />
                    )}
                </span>
                <div className="space-y-4 p-2">
                    <div>
                        <span className="text-gray-400">{item.labelValue}</span>
                        <span className="link-primary">
                            <h3 className="font-display text-xl">{item.titel}</h3>
                        </span>
                    </div>
                    <p className="line-clamp-3">{item.lead}</p>
                </div>
            </article>
        </a>
    );
};
