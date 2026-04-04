// /*
// © 2025 Aravinth Raj R. All rights reserved.
// Unauthorized copying of this file, via any medium, is strictly prohibited.
// Proprietary and confidential.
// Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
// */

import { PageContainer, LogoHeader, Footer, Loader } from "@/components";
import { Body } from "./components";
import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { useVerifyOtpStore } from "./stores";
import { useSendOtpStore } from "@/screens/Login/stores";
import { showToast } from "@/utils/toast";

export const OtpScreen = ({ navigation, route }: any) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const { email } = route.params;

  const { verifyOtpLoading, verifyOtpError, fetchVerifyOtp, resetVerifyOtp } =
    useVerifyOtpStore();

  const {
    sendOtpLoading,
    sendOtpResponse,
    sendOtpError,
    fetchSendOtp,
    resetSendOtp,
  } = useSendOtpStore();

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
    if (verifyOtpError) {
      showToast(verifyOtpError, "error");
      resetVerifyOtp();
    }
  }, [verifyOtpError]);

  useEffect(() => {
    if (sendOtpResponse) {
      showToast(
        sendOtpResponse.rawOtp
          ? `OTP sent successfully. OTP: ${sendOtpResponse.rawOtp}`
          : sendOtpResponse.message,
        "success",
      );
      resetSendOtp();
    }
  }, [sendOtpResponse]);

  useEffect(() => {
    if (sendOtpError) {
      showToast(sendOtpError, "error");
      resetSendOtp();
    }
  }, [sendOtpError]);

  const _handleResendOtp = async () => {
    if (!email) {
      showToast("Email is missing", "error");
      return;
    }

    await fetchSendOtp({ email });
  };

  const _handleVerifyOtp = async (otp: string) => {
    const res = await fetchVerifyOtp(email, otp);
    showToast(res.message, "success");
  };

  return (
    <>
      <PageContainer isLightStatusBar={false}>
        <LogoHeader />
        <Body
          email={email}
          onVerifyOtp={_handleVerifyOtp}
          onResendOtp={_handleResendOtp}
        />
      </PageContainer>

      {(verifyOtpLoading || sendOtpLoading) && <Loader useModalLoader />}

      {!keyboardOpen && <Footer />}
    </>
  );
};
