/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

// import { PageContainer, LogoHeader, Footer } from "@/components";
// import { useEffect, useState } from "react";
// import { Keyboard, Platform } from "react-native";
// import { Body } from "./components";
// import * as SecureStore from "expo-secure-store";
// import { getRoleFromEmail } from "@/utils";

// export const LoginScreen = ({ navigation }: any) => {
//   const [keyboardOpen, setKeyboardOpen] = useState(false);
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     const showSub = Keyboard.addListener(
//       Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
//       () => setKeyboardOpen(true)
//     );

//     const hideSub = Keyboard.addListener(
//       Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
//       () => setKeyboardOpen(false)
//     );

//     return () => {
//       showSub.remove();
//       hideSub.remove();
//     };
//   }, []);

//   const _navigateToOtp = async () => {
//     const role = getRoleFromEmail(email);
//     await SecureStore.setItemAsync("role", role);

//     navigation.navigate("Otp");
//   };

//   return (
//     <>
//       <PageContainer isLightStatusBar={false}>
//         <LogoHeader />
//         <Body navigateToOtp={_navigateToOtp} setEmail={setEmail} />
//       </PageContainer>

//       {!keyboardOpen && <Footer />}
//     </>
//   );
// };

import { PageContainer, LogoHeader, Footer } from "@/components";
import { useEffect, useState } from "react";
import { Keyboard, Platform, Alert } from "react-native";
import { Body } from "./components";
import { useSendOtpStore, useGoogleLoginStore } from "./stores";

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
    googleLoginLoading,
    googleLoginResponse,
    googleLoginError,
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
    if (sendOtpResponse) {
      Alert.alert("Success", sendOtpResponse);
      resetSendOtp();
      navigation.navigate("Otp", { email });
    }
  }, [sendOtpResponse]);

  useEffect(() => {
    if (sendOtpError) {
      Alert.alert("Error", sendOtpError);
      resetSendOtp();
    }
  }, [sendOtpError]);

  useEffect(() => {
    if (googleLoginResponse) {
      resetGoogleLogin();
      navigation.replace("Home");
    }
  }, [googleLoginResponse]);

  useEffect(() => {
    if (googleLoginError) {
      Alert.alert("Error", googleLoginError);
      resetGoogleLogin();
    }
  }, [googleLoginError]);

  const _handleSendOtp = async () => {
    if (!email) {
      Alert.alert("Error", "Email is required");
      return;
    }

    await fetchSendOtp({ email });
  };

  const _handleGoogleLogin = async (idToken: string) => {
    await fetchGoogleLogin({ idToken });
  };

  return (
    <>
      <PageContainer isLightStatusBar={false}>
        <LogoHeader />
        <Body
          navigateToOtp={_handleSendOtp}
          handleGoogleLogin={_handleGoogleLogin}
          setEmail={setEmail}
          loading={sendOtpLoading || googleLoginLoading}
        />
      </PageContainer>

      {!keyboardOpen && <Footer />}
    </>
  );
};
