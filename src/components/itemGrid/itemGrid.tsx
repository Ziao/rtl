import { FC } from "react";
import { BundelItem } from "../../types/api/bundleResponse";
import { ItemGridItem } from "./itemGridItem";
import "./itemGrid.scss";

interface ItemGridProps {
    items: BundelItem[];
    isLoading: boolean;
    onItemClicked: (item: BundelItem) => void;
}

export const ItemGrid: FC<ItemGridProps> = ({ items, isLoading, onItemClicked }) => {
    // Note: While I don't think a grid-type layout is neccesarily the best way to consume content, I  wanted to do
    // something different from the Boulevard site.

    return (
        <div data-testid="ItemGrid" className="ItemGrid">
            {items?.map((item, i) => (
                <ItemGridItem key={item.id} item={item} onClick={() => onItemClicked(item)} index={i} />
            ))}
        </div>
    );
};
