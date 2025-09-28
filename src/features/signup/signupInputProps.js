export const inputPropsDict = {
    이메일: {
        name: "email",
        type: "email",
        autoComplete: "email",
        maxLength: 200,
        style: { width: "100%" },
    },
    "인증 번호": {
        name: "verification_code",
        type: "text",
        autoComplete: "off",
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
    닉네임: {
        name: "nickname",
        type: "text",
        autoComplete: "off",
        minLength: 2,
    },
};

export const inputPropsEntryArray = Object.entries(inputPropsDict);
