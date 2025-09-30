import { useNavigate } from "react-router";
import ConfirmationModal from "./ConfirmationModal";
import CustomButton from "../customButton/CustomButton";
import useLinkUpStore from "../../shared/store/store";
import { checkHavingKorean } from "../../shared/utils/stringUtils";

const ErrorModal = ({ error, isRedirectingWithUnknownError }) => {
    const modalKey = useLinkUpStore((state) => state.modalKey);
    const setModalKey = useLinkUpStore((state) => state.setModalKey);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
        setModalKey(null);
    };

    const message = error?.response?.data?.detail;
    const hasKorean = checkHavingKorean(message);

    const isShowingConfirmButton = hasKorean || !isRedirectingWithUnknownError;

    return (
        <ConfirmationModal isOn={modalKey === "error"} onBackgroundClick={() => setModalKey(null)}>
            <ConfirmationModal.TextGroup>
                {!hasKorean && (
                    <>
                        <ConfirmationModal.Title>
                            알 수 없는 오류가 발생했습니다
                        </ConfirmationModal.Title>
                        <ConfirmationModal.Description>
                            잠시 후 다시 시도해주세요
                        </ConfirmationModal.Description>
                    </>
                )}
                {hasKorean && <ConfirmationModal.Title>{message}</ConfirmationModal.Title>}
            </ConfirmationModal.TextGroup>

            {!isShowingConfirmButton && (
                <CustomButton onClick={handleClick}>메인 페이지로 이동</CustomButton>
            )}
            {isShowingConfirmButton && (
                <CustomButton onClick={() => setModalKey(null)}>확인</CustomButton>
            )}
        </ConfirmationModal>
    );
};

export default ErrorModal;
