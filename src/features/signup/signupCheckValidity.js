/**
 * @param {HTMLInputElement} verifiedEmail
 * @param {HTMLInputElement} email
 * @param {(verifiedEmail: string) => void} setVerifiedEmail
 * @returns {boolean} is email valid?
 */
export const checkAdditionalEmailValidity = (
    verifiedEmail,
    email,
    setVerifiedEmail,
) => {
    if (!verifiedEmail) {
        email.setCustomValidity("이메일을 인증해야 합니다");
        email.reportValidity();
        return false;
    }

    if (verifiedEmail !== email.value) {
        email.setCustomValidity("이메일을 다시 인증해야 합니다");
        email.reportValidity();
        setVerifiedEmail(null);
        return false;
    }

    email.setCustomValidity("");

    return true;
};

/**
 * @param {HTMLInputElement} password
 * @param {HTMLInputElement} passwordConfirm
 * @returns {boolean} is password valid?
 */
export const checkAdditionalPasswordValidity = (password, passwordConfirm) => {
    if (password.value !== passwordConfirm.value) {
        passwordConfirm.setCustomValidity("비밀번호가 일치하지 않습니다");
        passwordConfirm.reportValidity(); // Shows the popup
        return false;
    }

    passwordConfirm.setCustomValidity(""); // Clear any previous error

    return true;
};
