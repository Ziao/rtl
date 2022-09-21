import { BundelItem, CropType } from "../../../types/api/bundleResponse";
import { selectPreferredItemImage } from "./selectPreferredItemImage";

let item: BundelItem;

describe("selectPreferredItemImage", () => {
    beforeEach(() => {
        item = {
            // @ts-ignore Please pretend this is a full BundleItem
            afbeelding: {
                crops: [
                    { type: CropType.SquareMedium, path: "src", height: 100, width: 100, ratio: "1:1" },
                    { type: CropType.ArtikelTop, path: "src", height: 100, width: 100, ratio: "1:1" },
                    { type: CropType.Liggend, path: "src", height: 100, width: 100, ratio: "1:1" },
                ],
            },
        };
    });

    it("should select the first matching image type (array)", () => {
        const im = selectPreferredItemImage(item, [CropType.InlineSmall, CropType.ArtikelTop, CropType.Liggend]);
        expect(im).not.toBeNull();
        expect(im!.type).toBe(CropType.ArtikelTop);
    });

    it("should select the first matching image type (string)", () => {
        const im = selectPreferredItemImage(item, CropType.Liggend);
        expect(im).not.toBeNull();
        expect(im!.type).toBe(CropType.Liggend);
    });

    it("should fall back to square_medium if nothing matches", () => {
        const im = selectPreferredItemImage(item, [CropType.LiggendBreed]);
        expect(im).not.toBeNull();
        expect(im!.type).toBe(CropType.SquareMedium);
    });

    it("should return null if nothing matches, including the fallback", () => {
        item.afbeelding.crops = [{ type: CropType.Staand, path: "src", height: 100, width: 100, ratio: "1:1" }];

        const im = selectPreferredItemImage(item, [CropType.LiggendBreed]);
        expect(im).toBeNull();
    });
});
