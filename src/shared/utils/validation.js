export const inputNameToValidationProps = {
    email: {
        type: "email",
        autoComplete: "email",
        maxLength: 200,
        required: true,
    },
    verification_code: {
        type: "text",
        autoComplete: "off",
        required: true,
    },
    password: {
        type: "password",
        autoComplete: "new-password",
        minLength: 8,
        maxLength: 200,
        pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$",
        title: "소문자, 대문자, 특수문자를 하나 이상 씩 써주세요",
        required: true,
    },
    passwordConfirm: {
        type: "password",
        autoComplete: "off",
        required: true,
    },
    nickname: {
        type: "text",
        autoComplete: "off",
        minLength: 2,
        required: true,
    },
};
