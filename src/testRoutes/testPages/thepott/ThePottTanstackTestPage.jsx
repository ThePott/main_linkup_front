import { useEffect, useState } from "react";
import { getThenLog } from "../../../package/commonServices/fetchVariants";
import CustomButton from "../../../package/customButton/CustomButton";
import { Vstack } from "../../../package/layout";
import useSubscriptions from "../../../shared/services/useSubscriptions";
import useLinkUpStore from "../../../shared/store/store";

const ThePottTanstackTestPage = () => {
    const artistArray = useLinkUpStore((state) => state.artistArray);
    const { postMutation, deleteMutation } = useSubscriptions();
    const [idolArray, setIdolArray] = useState([]);

    const baseURL = import.meta.env.VITE_BASE_URL;
    const access_token = useLinkUpStore((state) => state.access_token);
    const callback = (data) => {
        console.log({ data });
        setIdolArray(data.artists);
    };

    const variableNewjeans = {
        body: { artist_id: 11 },
        newOne: { artist_id: 11, group_name: "뉴진스" },
    };
    const variableIve = {
        body: { artist_id: 12 },
        newOne: { artist_id: 12, group_name: "아이브" },
    };
    const variableTaeyeon = {
        body: { artist_id: 38 },
        newOne: { artist_id: 38, stage_name: "태연", group_name: "소녀시대" },
    };

    useEffect(() => {
        getThenLog(`${baseURL}/api/idol`, callback, access_token);
    }, []);

    return (
        <Vstack>
            <p>Tan Stack Query Test Page</p>
            <p>idol array</p>
            {idolArray.map((idol) => (
                <p>{idol.name}</p>
            ))}
            <p>subscribing artist array</p>
            {artistArray.map((artist) => (
                <p>
                    {artist.stage_name || artist.group_name}__{artist.artist_id}
                </p>
            ))}

            <CustomButton onClick={() => postMutation.mutate(variableNewjeans)}>
                subscribe newjeans (11)
            </CustomButton>
            <CustomButton onClick={() => deleteMutation.mutate(11)}>
                unsubscribe newjeans (11)
            </CustomButton>

            <CustomButton onClick={() => postMutation.mutate(variableIve)}>
                subscribe ive (12)
            </CustomButton>
            <CustomButton onClick={() => deleteMutation.mutate(12)}>
                unsubscribe ive (12)
            </CustomButton>

            <CustomButton onClick={() => postMutation.mutate(variableTaeyeon)}>
                subscribe taeyeon (38)
            </CustomButton>
            <CustomButton onClick={() => deleteMutation.mutate(38)}>
                unsubscribe taeyeon (38)
            </CustomButton>
        </Vstack>
    );
};

export default ThePottTanstackTestPage;
