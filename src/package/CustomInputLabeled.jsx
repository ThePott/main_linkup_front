import CustomInput from "./CustomInput";
import { Vstack } from "./layout";

const CustomInputLabeled = ({ label, vstackProps, inputProps }) => {
    return (
        <Vstack gap="none" {...vstackProps}>
            <p
                style={{
                    fontWeight: "var(--font-weight-semibold)",
                    textAlign: "start",
                }}
            >
                {label}
            </p>
            <CustomInput {...inputProps} required />
        </Vstack>
    );
};

export default CustomInputLabeled;
