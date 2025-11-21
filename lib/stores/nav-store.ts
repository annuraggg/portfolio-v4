import { create } from "zustand"

interface NavStore {
  navigating: boolean
  setNavigating: (n: boolean) => void
}

export const useNavStore = create<NavStore>((set) => ({
  navigating: false,
  setNavigating: (n) => set({ navigating: n }),
}))
