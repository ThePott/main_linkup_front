import styles from "./CustomButton.module.css";

const shapeToClassName = {
    PILL: styles.pill,
    RECTANGLE: styles.rectangle,
};

const colorToClassName = {
    RED: styles.red,
    YELLOW: styles.yellow,
    BLUE: styles.blue,
    MONO: styles.mono,
};

const makeButtonClassName = (shape, color, isOn) => {
    const shapeClassName = shapeToClassName[shape];
    const offClassName = styles.offStyle;
    const onClassName = colorToClassName[color];
    const onOffClassName = isOn ? onClassName : offClassName;
    const defaultClassName = styles.default;

    return `${defaultClassName} ${onOffClassName} ${shapeClassName}`;
};

const CustomButton = ({
    shape = "RECTANGLE",
    isOn,
    color = "MONO",
    children,
    className,
    ...props
}) => {
    const defaultClassName = makeButtonClassName(shape, color, isOn);

    return (
        <button {...props} className={`${className} ${defaultClassName}`}>
            {children}
        </button>
    );
};

export default CustomButton;
