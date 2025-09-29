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

    const firstIdol = idolArray.find((idol) => idol.id === 1);

    const variables = {
        body: { artist_id: 1 },
        newOne: { artist_id: 1, stage_name: firstIdol.name, group_name: firstIdol.name },
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
                    {artist.stage_name || artist.group_name}__{artist.id}
                </p>
            ))}
            <CustomButton onClick={() => deleteMutation.mutate(1)}>unsubscribe idol 1</CustomButton>
            <CustomButton onClick={() => postMutation.mutate(variables)}>
                subscribe idol 1
            </CustomButton>
        </Vstack>
    );
};

export default ThePottTanstackTestPage;
