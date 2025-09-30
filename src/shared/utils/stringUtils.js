export const checkHavingKorean = (text) => {
    return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
};
