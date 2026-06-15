import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    isLoggedIn: boolean;
    userPin: string | null;
    userName: string;
    avatarColor: string;
    setPin: (pin: string) => void;
    login: (pin: string) => boolean;
    logout: () => void;
    setUserName: (name: string) => void;
    setAvatarColor: (color: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            userPin: null,
            userName: 'Rebecca Meegahapola',
            avatarColor: '#4F9C95',

            setPin: (pin: string) => {
                set({ userPin: pin });
            },

            login: (pin: string) => {
                const { userPin } = get();
                if (pin === userPin) {
                    set({ isLoggedIn: true });
                    return true;
                }
                return false;
            },

            logout: () => {
                set({ isLoggedIn: false });
            },

            setUserName: (name: string) => {
                set({ userName: name });
            },

            setAvatarColor: (color: string) => {
                set({ avatarColor: color });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);