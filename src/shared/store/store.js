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

            selectedArtist: null,
            setSelectedArtist(selectedArtist) {
                set({ selectedArtist });
            },

            eventArray: [],
            setEventArray(eventArray) {
                set({ eventArray });
            },
        }),
        {
            partialize: (state) => ({ access_token: state.access_token }),
        },
    ),
);

export default useLinkUpStore;
