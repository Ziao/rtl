import { RefObject } from "react";

export const useInView = (ref: RefObject<HTMLElement>, threshold: number = 0, sticky: boolean = false) => {
    // IntersectionObserver is not available in JSDOM
    return true;
};
