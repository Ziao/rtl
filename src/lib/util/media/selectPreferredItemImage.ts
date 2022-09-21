import { BundelItem, CropType } from "../../../types/api/bundleResponse";

/**
 * Tries to find the best image for the given item and image type. Falls back to `square_medium` if none found.
 * @param item The item to find an image for.
 * @param preferredImageType The preferred image type to find. Can be an array of types to try, in order
 * @returns The image for the given item and image type, or `null` if nothing matched.
 */
export const selectPreferredItemImage = (item: BundelItem, preferredImageType: CropType | CropType[]) => {
    // Make sure we are working with an array
    const imageTypes = Array.isArray(preferredImageType) ? preferredImageType : [preferredImageType];

    // For each image type, try to find and return a match
    for (const type of imageTypes) {
        const image = item.afbeelding.crops.find((crop) => crop.type === type);
        if (image) return image;
    }

    // If we are still here, we didn't find a match. Fall back to `square_medium`
    // If we also don't have that, this will return null.
    return item.afbeelding.crops.find((crop) => crop.type === CropType.SquareMedium) ?? null;
};
