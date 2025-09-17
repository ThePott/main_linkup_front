import { useQuery } from "@tanstack/react-query";
import CustomButton from "../../../package/customButton/CustomButton";
import { FullScreen, Vstack } from "../../../package/layout";
import RoundBox from "../../../package/RoundBox";
import axiosInstance from "../../../shared/services/axiosInstance";

const getHome = () => axiosInstance.get("/");
const getHealth = () => axiosInstance.get("/health");

const RoundBoxGlobalShadow = ({ style, children, ...props }) => {
    return (
        <RoundBox
            style={{ boxShadow: "var(--drop-shadow-md)", ...style }}
            {...props}
        >
            {children}
        </RoundBox>
    );
};

const ThePottApiTestPage = () => {
    const { data: homeData, refetch: refetchHome } = useQuery({
        queryKey: ["getHome"],
        queryFn: getHome,
        refetchOnWindowFocus: false,
        enabled: false,
    });
    const { data: healthData, refetch: refetchHealth } = useQuery({
        queryKey: ["getHealth"],
        queryFn: getHealth,
        refetchOnWindowFocus: false,
        enabled: false,
    });
    const handleClick = () => {
        fetch("http://3.39.239.114:8000/")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <FullScreen center>
            <RoundBoxGlobalShadow padding="XL">
                <Vstack gap="xl">
                    <CustomButton onClick={handleClick}>
                        fetch home
                    </CustomButton>
                    <RoundBoxGlobalShadow padding="MD" onClick={refetchHome}>
                        <CustomButton>/</CustomButton>
                        <p>{JSON.stringify(homeData)}</p>
                    </RoundBoxGlobalShadow>
                    <RoundBoxGlobalShadow padding="MD">
                        <CustomButton onClick={refetchHealth}>
                            /health
                        </CustomButton>
                        <p>{JSON.stringify(healthData)}</p>
                    </RoundBoxGlobalShadow>
                </Vstack>
            </RoundBoxGlobalShadow>
        </FullScreen>
    );
};

export default ThePottApiTestPage;
