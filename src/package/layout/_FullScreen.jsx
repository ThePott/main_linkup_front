import styles from "./_FullScreen.module.css";

const FullScreen = ({ center, children, className, ...props }) => {
    const additionalClassName = center ? styles.center : "";
    return (
        <div
            {...props}
            className={`${styles.fullScreen} ${additionalClassName} ${className}`}
        >
            {children}
        </div>
    );
};

export default FullScreen;
