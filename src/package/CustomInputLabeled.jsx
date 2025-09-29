import styles from "./CustomInputLabeled.module.css";
import CustomInput from "./CustomInput";
import { Vstack } from "./layout";

const CustomInputLabeled = ({ label, vstackProps, inputProps, required = true }) => {
    return (
        <Vstack gap="none" {...vstackProps}>
            <p className={styles.label}>{label}</p>
            <CustomInput {...inputProps} required={required} />
        </Vstack>
    );
};

export default CustomInputLabeled;
