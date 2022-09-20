import { FC } from "react";

interface NavbarProps {
    title: string;
}

export const Navbar: FC<NavbarProps> = ({ title }) => {
    return (
        <div className="sticky z-10 w-full top-0 h-16 text-white bg-black flex justify-center items-center">
            {title}
        </div>
    );
};
