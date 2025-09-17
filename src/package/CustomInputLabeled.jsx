import CustomInput from "./CustomInput";
import { Vstack } from "./layout";

const CustomInputLabeled = ({ label, ...inputProps }) => {
    return (
        <Vstack gap="none">
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
