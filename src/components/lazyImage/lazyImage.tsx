/**
 * Component that lazily loads an image once it's in the viewport
 */
import classNames from "classnames";
import { createRef, FC, ImgHTMLAttributes, SyntheticEvent, useState } from "react";

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
}

/**
 * Component that lazily loads an image once it's in the viewport, and then fades it in.
 * Good example of a component where extracting logic and UI is overkill.
 * @todo: implement the intersection logic
 */
export const LazyImage: FC<LazyImageProps> = ({ src, alt, className, ratio, extraAttributes }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [inView, setInView] = useState(false);
    const [useRatio, setUseRatio] = useState(ratio ?? 1);
    const imgRef = createRef<HTMLImageElement>();

    const onImageLoaded = async (e: SyntheticEvent<HTMLImageElement, Event>) => {
        await new Promise((r) => setTimeout(r, Math.random() * 1000));
        setIsLoaded(true);

        // If no ratio was passed, now is the time to calculate the real ratio, and use that
        if (ratio === undefined) setUseRatio(imgRef.current!.naturalWidth / imgRef.current!.naturalHeight);

        // if an onLoad was passed as an attribute, call it
        extraAttributes?.onLoad?.(e);
    };

    // Intersect logic:
    // const onScroll = () => {};
    // addEventListener
    // removeEventListener
    // onScroll()

    return (
        <div className={classNames("overflow-hidden w-full relative")} style={{ aspectRatio: useRatio }}>
            <div
                className={classNames("pointer-events-none transition-all duration-500", {
                    "opacity-0": isLoaded,
                })}
            >
                <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
            </div>
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className={classNames("absolute inset-0 transition-all duration-500", {
                    "opacity-0 scale-105": !isLoaded,
                })}
                onLoad={(e) => onImageLoaded(e)}
                {...extraAttributes}
            />
        </div>
    );
};
