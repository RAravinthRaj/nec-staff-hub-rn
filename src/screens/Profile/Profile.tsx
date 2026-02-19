/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer } from "@/components";
import { Body, Header, UserDetails } from "./components";
import { ScrollView } from "react-native";
import { PROFILE_CONFIG } from "./config";
import * as SecureStore from "expo-secure-store";
import { showToast } from "@/utils";

export const ProfileScreen = ({ navigation }: any) => {
  const _handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("role");

    showToast("LogOut Successful", "success");
  };

  return (
    <>
      <Header />
      <PageContainer isLightStatusBar={true}>
        <ScrollView>
          <Body data={PROFILE_CONFIG.data} />
          <UserDetails
            userDetails={PROFILE_CONFIG.data}
            handleLogOut={_handleLogout}
          />
        </ScrollView>
      </PageContainer>
    </>
  );
};
