import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useLinkUpStore = create()(
    persist(
        (set, get) => ({
            something: 1,
            setSomething: (diff) => {
                const state = get();
                const newSomething = state.something + diff;
                set({ something: newSomething });
            },

            access_token: null,
            setAccessToken: (access_token) => {
                set({ access_token });
            },

            user: null,
            setUser: (user) => {
                set({ user });
            },

            modalKey: null,
            setModalKey: (modalKey) => {
                set({ modalKey });
            },

            selectedArtist: null,
            setSelectedArtist: (selectedArtist) => {
                set({ selectedArtist });
            },

            eventArray: [],
            setEventArray: (eventArray) => {
                set({ eventArray });
            },

            artistArray: [],
            setArtistArray: (artistArray) => {
                set({ artistArray });
            },
            addArtistInTemp: (formData) => {
                const artist = {
                    stage_name: formData.get("stage_name"),
                    group_name: formData.get("group_name"),
                    debut_date: formData.get("debut_date"),
                    birth_date: formData.get("birth_date"),
                };

                const artistArray = [...get().artistArray, artist];
                set({ artistArray });
            },
            addArtistInReal: (data) => {
                const {
                    artist_id: id,
                    artist_name,
                    message: _message,
                    ...rest
                } = data;

                const artistArray = get().artistArray.map((artist) =>
                    artist.stage_name === artist_name
                        ? { ...artist, id, ...rest }
                        : artist,
                );
                set({ artistArray });
            },
            updateArtistInTemp: (artistId, formData) => {
                const updatedArtist = {
                    stage_name: formData.get("stage_name"),
                    group_name: formData.get("group_name"),
                    debut_date: formData.get("debut_date"),
                    birth_date: formData.get("birth_date"),
                };

                const artistArray = get().artistArray.map((artist) =>
                    artist.id === artistId
                        ? { ...artist, ...updatedArtist }
                        : artist,
                );
                set({ artistArray });
            },
            updateArtistInReal: (data) => {
                const {
                    artist_id,
                    artist_name: stage_name,
                    message: _message,
                    ...rest
                } = data;

                const artistArray = get().artistArray.map((artist) =>
                    artist.id === artist_id
                        ? { ...artist, stage_name, ...rest }
                        : artist,
                );
                set({ artistArray });
            },
            deleteArtist: (artist) => {
                const artistArray = get().artistArray.filter(
                    (el) => el.id !== artist.id,
                );
                set({ artistArray });
            },


            fanPostArray: [],
            setFanPostArray: (arr) => set({ fanPostArray: arr }),

            addFanPost: (newPost) => {
                const prev = get().fanPostArray;
                set({ fanPostArray: [newPost, ...prev] });
            },

            selectedEvent: null,
            setSelectedEvent: (selectedEvent) => {
                set({ selectedEvent });
            },

            //dummyMijin.js
            groupArray: [],
            setGroupArray: (groupArray) => set({ groupArray }),

            recommendedGroupArray: [],
            setRecommendedGroupArray: (arr) =>
                set({ recommendedGroupArray: arr }),

            searchResultArray: [],
            setSearchResultArray: (arr) => set({ searchResultArray: arr }),

            searchStatus: "success",
            setSearchStatus: (status) => set({ searchStatus: status }),

            subscribedArtistIdArray: [],
            toggleSubscribe: (artistId) =>
                set((state) => {
                    const current = state.subscribedArtistIdArray;
                    return current.includes(artistId)
                        ? {
                              subscribedArtistIdArray: current.filter(
                                  (id) => id !== artistId,
                              ),
                          }
                        : { subscribedArtistIdArray: [...current, artistId] };
                }),

        }),
        {
            name: "linkup-session-storage", // Name for your storage item
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                access_token: state.access_token,
                user: state.user,
            }),
        },
    ),
);

export default useLinkUpStore;
