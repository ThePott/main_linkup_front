import styles from "./Dropdown.module.css";

import { createContext, useContext } from "react";

const DropdownContext = createContext(null);

const useDropdownContext = () => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error("Fruit components must be used within FruitBox");
    }
    return context;
};

const DropdownItem = ({ children }) => {
    const { onItemClick } = useDropdownContext();

    return (
        <div onItemClick={onItemClick} className={styles.item}>
            {children}
        </div>
    );
};

const Dropdown = ({ anchorRef, onItemClick, children }) => {
    return (
        <DropdownContext.Provider value={{ onItemClick }}>
            <div>{children}</div>
        </DropdownContext.Provider>
    );
};

Dropdown.Item = ({ children }) => <DropdownItem>{children}</DropdownItem>;
export default Dropdown;
