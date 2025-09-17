import useLinkUpStore from "../../../../shared/store/store";

export const DebugButton = () => {
    const user = useLinkUpStore((state) => state.user);

    const handleClick = () => {
        console.log({ user });
    };
    return <CustomButton onClick={handleClick}>DEBUG</CustomButton>;
};
