import axiosInstance from "../../../shared/services/axiosInstance";
import useLinkUpStore from "../../../shared/store/store";

export const getCompaniesArtists = async () => {
    const response = await axiosInstance.get("/api/companies/artists");
    const data = response.data;
    useLinkUpStore.setState({ artistArray: data });
    return data;
};
