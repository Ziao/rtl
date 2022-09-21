import { FC } from "react";
import { BundelItem } from "../../types/api/bundleResponse";
import { ItemGridItem } from "./itemGridItem";

interface ItemGridProps {
    items: BundelItem[];
    isLoading: boolean;
    onItemClicked: (item: BundelItem) => void;
}

export const ItemGrid: FC<ItemGridProps> = ({ items, isLoading, onItemClicked }) => {
    // Note: While I don't think a grid-type layout is neccesarily the best way to consume content, I  wanted to do
    // something different from the Boulevard site.

    return (
        <div
            data-testid="ItemGrid"
            className="ItemGrid grid gap-x-2 gap-y-4"
            style={{ gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr))" }}
        >
            {/*<div className="grid gap-4 grid-flow-col grid-rows-5 auto-cols-auto" style={{ width: "1000px" }}>*/}
            {items?.map((item, i) => (
                <ItemGridItem key={item.id} item={item} onClick={() => onItemClicked(item)} index={i} />
            ))}
        </div>
    );
};
