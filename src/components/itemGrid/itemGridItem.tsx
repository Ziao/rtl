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

    // Of course, we'd normally wrap this in an <a>, but for the assignment's sake, we do it using an onClick
    return (
        <article data-testid="ItemGridItem" className="ItemGrid_item">
            {image && <LazyImage alt={item.titel} src={image.path} artificialDelayMs={index * 50} ratio={1.5} />}

            <div className="ItemGrid_item_meta">
                <div>
                    <span className="ItemGrid_item_category">{item.labelValue}</span>
                    <h3 className="ItemGrid_item_title" data-testid="ItemGridItemTitle">
                        {item.titel}
                    </h3>
                </div>
                <p className="ItemGrid_item_excerpt">{item.lead}</p>
            </div>
        </article>
    );
};
