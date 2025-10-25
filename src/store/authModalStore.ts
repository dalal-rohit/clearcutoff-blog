// store/authModalStore.ts
import { create } from 'zustand';

// --- NEW: Define the possible origins for the OTP flow ---
type OtpOrigin = 'login' | 'register';

// --- UPDATED: 'null' is removed here, it will be handled in the state type ---
type AuthModalType = 'login' | 'register' | 'otp';

// --- NEW: Define a type for the data payload ---
// This data is passed between different modal views
interface AuthPayload {
  mobileNumber?: string;
  from?: OtpOrigin; // To track where the OTP request came from
}

// --- UPDATED: The main state interface is expanded ---
interface AuthModalState {
  isOpen: boolean;
  type: AuthModalType | null; // The type can be null when the modal is closed
  payload: AuthPayload; // State to hold the mobile number and origin
  
  // The openModal function now accepts an object with type and an optional payload
  openModal: (args: { type: AuthModalType; payload?: AuthPayload }) => void;
  closeModal: () => void;
}

// --- Define the initial state for clarity and reusability ---
const initialState = {
  isOpen: false,
  type: null,
  payload: {
    mobileNumber: '',
    from: 'login' as OtpOrigin, // Default origin
  },
};

export const useAuthModal = create<AuthModalState>((set) => ({
  ...initialState, // Start with the initial state
  
  /**
   * Opens the modal with a specific type and an optional payload.
   * Merges the new payload with any existing payload data.
   */
  openModal: ({ type, payload = {} }) =>
    set((state) => ({
      isOpen: true,
      type,
      // Merge the new payload over the existing one
      // This is useful for pre-filling the mobile number when coming back from OTP
      payload: { ...state.payload, ...payload },
    })),
    
  /**
   * Closes the modal and resets all state to its initial values.
   */
  closeModal: () => set(initialState),
}));