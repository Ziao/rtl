/**
 * Extract the ratio from a string formatted as "w:h"
 */
export function extractRatio(ratio: string): number {
    const [width, height] = ratio.split(":").map(Number);
    return width / height;
}
