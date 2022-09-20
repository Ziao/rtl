import classNames from "classnames";
import { createRef, FC, ImgHTMLAttributes, SyntheticEvent, useEffect, useState } from "react";
import { useInView } from "../../hooks/misc/useInView";

interface LazyImageProps {
    /**
     * The image source
     */
    src: string;

    /**
     * The image alt text
     */
    alt: string;

    /**
     * Extra classes for the wrapper div
     */
    className?: string;

    /**
     * Ratio to use for the image and loader. Defaults to 1:1 (square) while loading, and then changes to the actual
     * ratio. Calculated using w/h
     */
    ratio?: number;

    /**
     * Any additional <img> attributes
     */
    extraAttributes?: ImgHTMLAttributes<HTMLImageElement>;

    /**
     * Add an extra delay to the loading of the image, useful for stagger effects
     */
    artificialDelayMs?: number;

    /**
     * Should we zoom in a touch when the user hovers over the image?
     */
    zoomOnHover?: boolean;
}

/**
 * Component that lazily loads an image once it's intersects the viewport, and then fades it in.
 * Maybe a bit excessive for this assignment, but it's a good example of a component where extracting logic and UI is
 * overkill.
 */
export const LazyImage: FC<LazyImageProps> = ({
    src,
    alt,
    className,
    ratio,
    extraAttributes,
    zoomOnHover,
    artificialDelayMs,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [useRatio, setUseRatio] = useState(ratio ?? 1);
    const imgRef = createRef<HTMLImageElement>();
    const containerRef = createRef<HTMLDivElement>();
    const inView = useInView(containerRef, 0, true);
    const [start, setStart] = useState(+new Date());

    // Once the image loads ..
    const onImageLoaded = async (e: SyntheticEvent<HTMLImageElement, Event>) => {
        if (artificialDelayMs) {
            // If we have an artificial delay, we need to wait for that before we can mark the image as loaded.
            // Keep the start time in mind as well.
            await new Promise((r) => setTimeout(r, Math.max(0, artificialDelayMs - (+new Date() - start))));
        }

        // If no ratio was passed, now is the time to calculate the real ratio, and use that
        if (ratio === undefined) setUseRatio(imgRef.current!.naturalWidth / imgRef.current!.naturalHeight);

        // Make things happen!
        setIsLoaded(true);

        // if an onLoad was passed as an attribute, call it
        extraAttributes?.onLoad?.(e);
    };

    return (
        <div
            ref={containerRef}
            className={classNames("overflow-hidden w-full group", className, {
                relative: !className?.includes("absolute"),
            })}
            style={{ aspectRatio: useRatio }}
        >
            <div
                className={classNames("transition-all duration-500", {
                    "opacity-0": isLoaded && inView,
                })}
            >
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            </div>

            {inView && (
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    className={classNames("w-full h-full transition-all duration-500 object-cover", {
                        "opacity-0 scale-105": !isLoaded || !inView,
                        "group-hover:scale-105": zoomOnHover,
                    })}
                    onLoad={(e) => onImageLoaded(e)}
                    {...extraAttributes}
                />
            )}
        </div>
    );
};
