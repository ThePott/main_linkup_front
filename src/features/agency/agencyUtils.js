export const convertFormDataToArtist = (formData) => {
    const artist = {
        stage_name: formData.get("stage_name"),
        group_name: formData.get("group_name"),
        debut_date: formData.get("debut_date"),
        birth_date: formData.get("birth_date"),
    };
    return artist;
};
