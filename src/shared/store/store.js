import { create } from "zustand";

const useLinkUpStore = create((set, get) => ({
    something: 1,
    setSomething(diff) {
        const state = get();
        const newSomething = state.something + diff;
        set({ something: newSomething });
    },

    user: null,
    setUser(user) {
        const oldUser = get().user;
        debugger;

        set({ user });
        const newUser = get().user;
        debugger;
    },

    isModalOn: false,
    setIsModalOn(isModalOn) {
        set({ isModalOn });
    },

    selectedArtist: null,
    setSelectedArtist(selectedArtist) {
        set({ selectedArtist });
    },
}));

export default useLinkUpStore;
