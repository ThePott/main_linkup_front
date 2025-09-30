/** label을 사용한 뒤 나머지를 쉽게 spread 하려면 애초에 둘이 분리되어야 하고
 * 이를 제일 쉽게 하는 법은 dict의 key value로 나누는 것이다
 */
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
