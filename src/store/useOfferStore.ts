// src/store/useOfferStore.ts
import { create } from "zustand";

interface OfferState {
  offerEnd: boolean; // true = expired, false = active
  setOfferEnd: (status: boolean) => void;
  resetOffer: () => void;
}

export const useOfferStore = create<OfferState>((set) => ({
  offerEnd: false, // initially not expired
  setOfferEnd: (status) => set({ offerEnd: status }),
  resetOffer: () => set({ offerEnd: false }),
}));
