/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { googleLoginAPI, GoogleLoginParams } from "../services";

type GoogleLoginState = {
  googleLoginLoading: boolean;
  googleLoginResponse: string | null;
  googleLoginError: string | null;

  fetchGoogleLogin: (params: GoogleLoginParams) => Promise<void>;
  resetGoogleLogin: () => void;
};

export const useGoogleLoginStore = create<GoogleLoginState>((set) => ({
  googleLoginLoading: false,
  googleLoginResponse: null,
  googleLoginError: null,

  fetchGoogleLogin: async (params: GoogleLoginParams) => {
    try {
      set({ googleLoginLoading: true, googleLoginError: null });

      const res = await googleLoginAPI(params);

      // ✅ Save securely
      await SecureStore.setItemAsync("token", res.token);
      await SecureStore.setItemAsync("role", res.role);

      set({ googleLoginResponse: res.message });
    } catch (err: any) {
      set({ googleLoginError: err?.message });
    } finally {
      set({ googleLoginLoading: false });
    }
  },

  resetGoogleLogin: () => {
    set({
      googleLoginLoading: false,
      googleLoginResponse: null,
      googleLoginError: null,
    });
  },
}));
