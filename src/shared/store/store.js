import { create } from 'zustand'

const useLinkUpStore = create((set, get) => ({
  something: 1,
  setSomething(diff) {
    const state = get()
    const newSomething = state.something + diff
    set({something: newSomething})
  }
}))

export default useLinkUpStore