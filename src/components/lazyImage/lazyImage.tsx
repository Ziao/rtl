/**
 * Component that lazily loads an image once it's in the viewport
 */
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

    // Any additional <img> attributes
    extraAttributes?: ImgHTMLAttributes<HTMLImageElement>;

    // Add an extra delay to the loading of the image
    artificialDelayMs?: number;

    zoomOnHover?: boolean;
}

/**
 * Component that lazily loads an image once it's in the viewport, and then fades it in.
 * Good example of a component where extracting logic and UI is overkill.
 * @todo: implement the intersection logic
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

    const onImageLoaded = async (e: SyntheticEvent<HTMLImageElement, Event>) => {
        if (artificialDelayMs) {
            await new Promise((r) => setTimeout(r, Math.max(0, artificialDelayMs - (+new Date() - start))));
        }

        setIsLoaded(true);

        // If no ratio was passed, now is the time to calculate the real ratio, and use that
        if (ratio === undefined) setUseRatio(imgRef.current!.naturalWidth / imgRef.current!.naturalHeight);

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
                    className={classNames(
                        "w-full h-full transition-all duration-500 object-cover xgroup-hover:scale-105",
                        {
                            "opacity-0 scale-105": !isLoaded || !inView,
                        }
                    )}
                    onLoad={(e) => onImageLoaded(e)}
                    {...extraAttributes}
                />
            )}
        </div>
    );
};
