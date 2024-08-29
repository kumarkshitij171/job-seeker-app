import { create } from 'zustand'

const useUser = create((set) => ({
    user: [],
    setUser: (user) => set(() => ({ user })),
    removeUser: () => set({ user: [] }),
    updateUser: (user) => set(() => ({ user })),
}))

export default useUser