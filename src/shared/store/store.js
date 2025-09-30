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

            eventDict: {},
            setEventDict: (eventDict) => {
                set({ eventDict });
            },

            selectedEvent: null,
            setSelectedEvent: (selectedEvent) => {
                set({ selectedEvent });
            },

            selectedMonthEventArray: [],
            setSelectedMonthEventArray: (selectedMonthEventArray) =>
                set({ selectedMonthEventArray }),

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

            commentsByPostId: {},
            setCommentsByPostId: (post_id, comments) =>
                set((state) => ({
                    commentsByPostId: {
                        ...state.commentsByPostId,
                        [post_id]: comments,
                    },
                })),
            addComment: (post_id, comment) =>
                set((state) => {
                    const existingComments = state.commentsByPostId[post_id] ?? [];
                    return {
                        commentsByPostId: {
                            ...state.commentsByPostId,
                            [post_id]: [...existingComments, comment],
                        },
                    };
                }),

            selectedFanPost: null,
            setSelectedFanPost: (selectedFanPost) => set({ selectedFanPost }),

            groupArray: [],
            setGroupArray: (groupArray) => set({ groupArray }),

            recommendedGroupArray: [],
            setRecommendedGroupArray: (arr) => set({ recommendedGroupArray: arr }),

            searchResultArray: [],
            setSearchResultArray: (arr) => set({ searchResultArray: arr }),

            searchStatus: "success",
            setSearchStatus: (status) => set({ searchStatus: status }),

            toggleSubscribe: async (artistId) => {
                try {
                    const current = get().artistArray;
                    const isSubscribed = current.some((a) => a.artist_id === artistId);

                    if (isSubscribed) {
                        await axiosReturnsData("DELETE", `/api/subscriptions/${artistId}`);
                    } else {
                        await axiosReturnsData("POST", `/api/subscriptions/`, {
                            artist_id: artistId,
                        });
                    }

                    const data = await axiosReturnsData(
                        "GET",
                        "/api/subscriptions?include_image=true",
                    );
                    set({ artistArray: data });
                } catch (err) {
                    console.error("구독/취소 API 호출 에러", err);
                }
            },
        }),
        {
            name: "linkup-session-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                access_token: state.access_token,
                user: state.user,
                artistArray: state.artistArray,
            }),
        },
    ),
);

export default useLinkUpStore;
