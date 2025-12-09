/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer, LogoHeader, Footer } from "@/components";
import { Body } from "./components";
import { SafeAreaView } from "react-native-safe-area-context";

export const LoginScreen = ({ navigation }: any) => {
  return (
    <>
      <PageContainer>
        <LogoHeader />
        <Body />
      </PageContainer>
      <Footer />
    </>
  );
};
