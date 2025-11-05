import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

interface LanguageState {
  courseLanguage: string;
  appLanguage: string;
  setCourseLanguage: (language: string) => void;
  setAppLanguage: (language: string) => void;
}

const STORAGE_KEY = 'language-settings';

// Helper function to safely get from localStorage
const getStoredValue = (key: string, defaultValue: string): string => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item)[key] || defaultValue : defaultValue;
  } catch (error) {
    console.warn(`Error reading ${key} from localStorage`, error);
    return defaultValue;
  }
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      // Initialize with stored values or defaults
      courseLanguage: getStoredValue('courseLanguage', 'en'),
      appLanguage: getStoredValue('appLanguage', 'en'),
      
      // Action to update course language
      setCourseLanguage: (language: string) => 
        set({ courseLanguage: language }),
      
      // Action to update app language
      setAppLanguage: (language: string) => 
        set({ appLanguage: language }),
    }),
    {
      name: STORAGE_KEY, // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
      // Optional: Only persist specific fields
      partialize: (state) => ({
        courseLanguage: state.courseLanguage,
        appLanguage: state.appLanguage,
      }),
    }
  )
);