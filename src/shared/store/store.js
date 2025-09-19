import { create } from "zustand";

const useLinkUpStore = create((set, get) => ({
    something: 1,
    setSomething(diff) {
        const state = get();
        const newSomething = state.something + diff;
        set({ something: newSomething });
    },

    token: null,
    setToken(token) {
        set({ token });
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
}));

export default useLinkUpStore;
