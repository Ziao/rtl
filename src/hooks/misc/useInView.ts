import { RefObject, useEffect, useState } from "react";

/**
 * Returns a boolean, indicating whether an element is in the viewport.
 * @param ref Reference to an element to keep track of
 * @param threshold The percentage of the element that should be visible before returning true (0 to 1)
 * @param sticky When true, do not revert to false after the element hides again
 */
export const useInView = (ref: RefObject<HTMLElement>, threshold: number = 0, sticky: boolean = false) => {
    const [inView, setInView] = useState(false);

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (sticky && inView) return;
            setInView(entry.isIntersecting);
        },
        {
            root: null,
            rootMargin: "0px",
            threshold,
        }
    );

    useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return inView;
};
