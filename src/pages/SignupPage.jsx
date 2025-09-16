import { useState } from "react";
import RoundBox from "../package/RoundBox";
import CustomInput from "../package/CustomInput";
import { Vstack } from "../package/layout";
import CustomButton from "../package/customButton/CustomButton";

const inputFieldInfoArray = [
    ["이메일", "artistName", "email", "name"],
    ["비밀번호", "password", "new-password", "password"],
    ["비밀번호 확인", "passwordConfirm", "new-password", "passwordConfirm"],
    ["핸드폰 번호", "phone_number", "tel", "phone_number"],
    ["닉네임", "nickname", "text", "nickname"],
];

const SignupPage = () => {
    const [isForAgency, setIsForAgency] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const {
            artistName,
            password,
            passwordConfirm,
            phone_number,
            nickname,
        } = event.target;

        const body = {
            name: artistName.value,
            password: password.value,
            phone_number: phone_number.value,
            nickname: nickname.value,
        };
        console.log({ body });
    };
    return (
        <form onSubmit={handleSubmit}>
            <Vstack center style={{ width: "600px" }}>
                <p>이게 뭘까</p>
                <p>이게 뭘까</p>
                <p>이게 뭘까</p>
                <p>이게 뭘까</p>
                <p>이게 뭘까</p>
                <p>이게 뭘까</p>
                <p>이게 뭘까</p>
                {inputFieldInfoArray.map((info) => (
                    <CustomInput key={info[0]} name={info[1]} type={info[2]} />
                ))}
                <CustomButton>회원가입</CustomButton>
            </Vstack>
        </form>
    );
};

export default SignupPage;
