import { FC } from "react";
import "./navbar.scss";

interface NavbarProps {
    title: string;
}

export const Navbar: FC<NavbarProps> = ({ title }) => {
    return (
        <div className="Navbar">
            <h1 className="Navbar_title">{title}</h1>
        </div>
    );
};
