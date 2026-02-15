/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import axios from "axios";
import { config } from "@/config";

export interface GoogleLoginParams {
  idToken: string;
}

export interface GoogleLoginResponse {
  message: string;
  token: string;
  role: string;
}

export const googleLoginAPI = async (
  params: GoogleLoginParams,
): Promise<GoogleLoginResponse> => {
  try {
    const res = await axios.post(`${config.restBaseURL}/google-login`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message || err?.message || "Google login failed";
    throw new Error(msg);
  }
};
