const TempRoundBox = ({ children }) => {
    return (
        <div
            style={{
                // maxWidth: "600px",
                padding: "12px",
                borderRadius: "6px",
                backgroundColor: "green",
            }}
        >
            {children}
        </div>
    );
};

const Background = ({ onBackgroundClick, children }) => {
    return (
        <div
            onClick={onBackgroundClick}
            style={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                top: 0,
                left: 0,

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <TempRoundBox>{children}</TempRoundBox>
        </div>
    );
};

const Modal = ({ isOn, onBackgroundClick, children }) => {
    if (!isOn) {
        return null;
    }
    return (
        <Background onBackgroundClick={onBackgroundClick}>
            {children}
        </Background>
    );
};

export default Modal;
