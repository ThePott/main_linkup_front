import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosReturnsData } from "../services/axiosInstance";

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

            recommendArtistArray: [],
            setRecommendArtistArray: (recommendArtistArray) => {
                set({ recommendArtistArray });
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

            groupArray: [],
            setGroupArray: (groupArray) => set({ groupArray }),

            recommendedGroupArray: [],
            setRecommendedGroupArray: (arr) => set({ recommendedGroupArray: arr }),

            searchResultArray: [],
            setSearchResultArray: (arr) => set({ searchResultArray: arr }),

            searchStatus: "success",
            setSearchStatus: (status) => set({ searchStatus: status }),

        subscribedArtistIdArray: [],
        // 서버로 POST/DELETE 보내는 toggleSubscribe
        toggleSubscribe: async (artistId) => {
            const current = get().subscribedArtistIdArray;
            // 이미 구독중이면 서버에 DELETE
            if (current.includes(artistId)) {
            try {
                // subscription_id를 artist_id와 동일하게 관리하고 있으면 이 부분 서버 로직에 맞게 변경
                await axiosReturnsData("DELETE", `/api/subscriptions/${artistId}`);
                set({
                subscribedArtistIdArray: current.filter((id) => id !== artistId),
                });
            } catch (err) {
                console.error("구독 취소 API 호출 에러", err);
            }
            } else {
            try {
                await axiosReturnsData("POST", `/api/subscriptions/`, {
                artist_id: artistId,
                });
                set({ subscribedArtistIdArray: [...current, artistId] });
            } catch (err) {
                console.error("구독 API 호출 에러", err);
            }
            }
        },
        }),
    {
        name: "linkup-session-storage",
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
            access_token: state.access_token,
            user: state.user,
        }),
        }
    )
);

export default useLinkUpStore;