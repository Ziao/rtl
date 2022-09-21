import { render } from "@testing-library/react";
import { BundelItem, CropType } from "../../types/api/bundleResponse";
import { ItemGrid } from "./itemGrid";

jest.mock("../../hooks/misc/useInView");

// @ts-ignore
const items = [
    {
        titel: "Item 1",
        id: 1,
        urlAlias: "https://www.boulevard.nl/item-1",
        afbeelding: { crops: [{ type: CropType.SquareMedium, path: "src" }] },
    },
    {
        titel: "Item 2",
        id: 2,
        urlAlias: "https://www.boulevard.nl/item-2",
        afbeelding: { crops: [{ type: CropType.SquareMedium, path: "src" }] },
    },
    {
        titel: "Item 3",
        id: 3,
        urlAlias: "https://www.boulevard.nl/item-3",
        afbeelding: { crops: [{ type: CropType.SquareMedium, path: "src" }] },
    },
] as unknown as BundelItem[];

describe("itemGrid", () => {
    it("renders all of the items", async () => {
        const $el = render(<ItemGrid items={items} isLoading={false} onItemClicked={() => {}} />);
        const $items = await $el.findAllByTestId("ItemGridItem");
        expect($items.length).toBe(3);

        // You could argue that this should be tested in the itemGridItem.spec.tsx file. But time constraints say
        // otherwise.
        const $titles = await $el.findAllByTestId("ItemGridItemTitle");
        const titles = $titles.map((el) => el.textContent);
        expect(titles).toEqual(["Item 1", "Item 2", "Item 3"]);
    });
});
