import styles from "./_FullScreen.module.css";

const FullScreen = ({ children, className, ...props }) => {
    return (
        <div {...props} className={`${styles.fullScreen} ${className}`}>
            {children}
        </div>
    );
};

export default FullScreen;
