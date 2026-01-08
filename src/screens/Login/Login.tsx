/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer, LogoHeader, Footer } from "@/components";
import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { Body } from "./components";
import * as SecureStore from "expo-secure-store";
import { getRoleFromEmail } from "@/utils";

export const LoginScreen = ({ navigation }: any) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardOpen(true)
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardOpen(false)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const _navigateToOtp = async () => {
    const role = getRoleFromEmail(email);
    await SecureStore.setItemAsync("role", role);

    navigation.navigate("Otp");
  };

  return (
    <>
      <PageContainer isLightStatusBar={false}>
        <LogoHeader />
        <Body navigateToOtp={_navigateToOtp} setEmail={setEmail} />
      </PageContainer>

      {!keyboardOpen && <Footer />}
    </>
  );
};
