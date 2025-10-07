import styles from "./CustomInput.module.css";

const CustomInput = ({ placeholder = "", onEnter, className, ...props }) => {
    const handleKeyDown = (event) => {
        if (event.key !== "Enter") {
            return;
        }

        if (!event.nativeEvent.isComposing) {
            event.target.blur();
        }

        if (onEnter) {
            onEnter(event.target.value);
        }
    };

    return (
        <input
            {...props}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className={`${styles.input} ${className}`}
        />
    );
};

export default CustomInput;
