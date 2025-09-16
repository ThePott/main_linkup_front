import { useState } from "react";
import RoundBox from "../package/RoundBox";
import CustomInput from "../package/CustomInput";
import { Hstack, Vstack } from "../package/layout";
import CustomButton from "../package/customButton/CustomButton";

const inputPropsDict = {
    이메일: {
        name: "email",
        type: "email",
        autoComplete: "email",
        maxLength: 200,
    },
    비밀번호: {
        name: "password",
        type: "password",
        autoComplete: "new-password",
        minLength: 8,
        maxLength: 200,
        pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$",
        title: "소문자, 대문자, 특수문자를 하나 이상 씩 써주세요",
    },
    "비밀번호 확인": {
        name: "passwordConfirm",
        type: "password",
        autoComplete: "off",
    },
    "핸드폰 번호": {
        name: "phone_number",
        type: "tel",
        autoComplete: "tel",
        minLength: 4,
        maxLength: 20,
        pattern: "^[0-9]{4,20}$",
        title: "- 없이 숫자만 입력하세요",
    },
    닉네임: {
        name: "nickname",
        type: "text",
        autoComplete: "off",
        minLength: 2,
    },
};
const inputPropsEntryArray = Object.entries(inputPropsDict);

const CustomInputWithLabel = ({ label, ...inputProps }) => {
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

const SignupPage = () => {
    const [isForAgency, setIsForAgency] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const { password, passwordConfirm } = event.target;

        if (password.value !== passwordConfirm.value) {
            passwordConfirm.setCustomValidity("비밀번호가 일치하지 않습니다");
            passwordConfirm.reportValidity(); // Shows the popup
            console.log({ password, passwordConfirm });
            return;
        }

        passwordConfirm.setCustomValidity(""); // Clear any previous error

        const body = inputPropsEntryArray.reduce((acc, entry) => {
            if (entry[0] === "비밀번호 확인") {
                return acc;
            }
            acc[entry[0]] = entry[1].name;
            return acc;
        }, {});

        console.log({ body });
    };

    return (
        <RoundBox>
            <Vstack center>
                <p>이게 뭘까</p>
                <p>이게 뭘까</p>
                <p>이게 뭘까</p>
                <p>이게 뭘까</p>
                <p>이게 뭘까</p>
                <p>이게 뭘까</p>
                <p>이게 뭘까</p>
                <Hstack>
                    <CustomButton
                        isOn={!isForAgency}
                        onClick={() => setIsForAgency(false)}
                    >
                        팬
                    </CustomButton>
                    <CustomButton
                        isOn={isForAgency}
                        onClick={() => setIsForAgency(true)}
                    >
                        소속사
                    </CustomButton>
                </Hstack>
                <form onSubmit={handleSubmit}>
                    <Vstack style={{ width: "400px" }}>
                        {inputPropsEntryArray.map((entry) => (
                            <CustomInputWithLabel
                                key={entry[0]}
                                label={entry[0]}
                                {...entry[1]}
                            />
                        ))}
                        <CustomButton>회원가입</CustomButton>
                    </Vstack>
                </form>
            </Vstack>
        </RoundBox>
    );
};

export default SignupPage;
