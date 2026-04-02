/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer, LogoHeader, Footer } from "@/components";
import { useEffect, useState } from "react";
import { Keyboard, Platform, Alert } from "react-native";
import { Body } from "./components";
import { useSendOtpStore, useGoogleLoginStore } from "./stores";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { config } from "@/config";
import { showToast } from "@/utils/toast";
import { Loader } from "@/components/Loader";

export const LoginScreen = ({ navigation }: any) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [email, setEmail] = useState("");

  const {
    sendOtpLoading,
    sendOtpResponse,
    sendOtpError,
    fetchSendOtp,
    resetSendOtp,
  } = useSendOtpStore();

  const {
    googleLoginError,
    googleLoginLoading,
    fetchGoogleLogin,
    resetGoogleLogin,
  } = useGoogleLoginStore();

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardOpen(true),
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardOpen(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: config.googleWebClientId,
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    if (sendOtpResponse) {
      showToast(sendOtpResponse, "success");
      resetSendOtp();
      navigation.navigate("Otp", { email });
    }
  }, [sendOtpResponse]);

  useEffect(() => {
    if (sendOtpError) {
      showToast(sendOtpError, "error");
      resetSendOtp();
    }
  }, [sendOtpError]);

  useEffect(() => {
    if (googleLoginError) {
      showToast(googleLoginError, "error");
      resetGoogleLogin();
    }
  }, [googleLoginError]);

  const _handleSendOtp = async () => {
    if (!email) {
      showToast("Email is required", "error");
      return;
    }

    await fetchSendOtp({ email });
  };

  const _handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      await GoogleSignin.signOut();

      const response = await GoogleSignin.signIn();
      const email = response?.data?.user?.email;

      if (!email) {
        showToast("Unable to get Google email.", "error");
        return;
      }

      const res = await fetchGoogleLogin(email);

      showToast(res.message, "success");
      resetGoogleLogin();
    } catch (error: any) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          return;

        case statusCodes.IN_PROGRESS:
          showToast("Google Sign-In is already in progress.", "info");
          return;

        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          showToast(
            "Google Play Services is not available or outdated.",
            "error",
          );
          return;

        default:
          showToast(error.message || "Something went wrong.", "error");
          return;
      }
    }
  };

  return (
    <>
      <PageContainer isLightStatusBar={false}>
        <LogoHeader />
        <Body
          navigateToOtp={_handleSendOtp}
          handleGoogleLogin={_handleGoogleLogin}
          setEmail={setEmail}
        />

        {(sendOtpLoading || googleLoginLoading) && <Loader useModalLoader />}
      </PageContainer>

      {!keyboardOpen && <Footer />}
    </>
  );
};
