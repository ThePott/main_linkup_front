import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useLinkUpStore = create()(
    persist(
        (set, get) => ({
            something: 1,
            setSomething(diff) {
                const state = get();
                const newSomething = state.something + diff;
                set({ something: newSomething });
            },

            access_token: null,
            setAccessToken(access_token) {
                set({ access_token });
            },

            user: null,
            setUser(user) {
                set({ user });
            },

            isModalOn: false,
            setIsModalOn(isModalOn) {
                set({ isModalOn });
            },

            modalKey: null,
            setModalKey(modalKey) {
                set({ modalKey });
            },

            selectedArtist: null,
            setSelectedArtist(selectedArtist) {
                set({ selectedArtist });
            },

            eventArray: [],
            setEventArray(eventArray) {
                set({ eventArray });
            },

            artistArray: [],
            setArtistArray(artistArray) {
                set({ artistArray });
            },

            selectedEvent: null,
            setSelectedEvent(selectedEvent) {
                set({ selectedEvent });
            },

            //dummyMijin.js
            groupArray: [], 
            setGroupArray: (groupArray) => set({ groupArray }),

            recommendedGroupArray: [],
            setRecommendedGroupArray: (arr) => set({ recommendedGroupArray: arr }),

            searchResultArray: [],
            setSearchResultArray: (arr) => set({ searchResultArray: arr }),

            searchStatus: "success",
            setSearchStatus: (status) => set({ searchStatus: status }),

            subscribedArtistIdArray: [],
            toggleSubscribe: (artistId) =>
                set((state) => {
                    const current = state.subscribedArtistIdArray;
                    return current.includes(artistId)
                        ? { subscribedArtistIdArray: current.filter((id) => id !== artistId) }
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
        }
    )
);

export default useLinkUpStore;
