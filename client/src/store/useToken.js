import { create } from 'zustand'

const useToken = create((set) => ({
    token: null,
    setUserToken: (token) => set(() => ({ token })),
    removeUserToken: () => set({ token: null }),
    updateUserToken: (token) => set(() => ({ token })),
}))

export default useToken;