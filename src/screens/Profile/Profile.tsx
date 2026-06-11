/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";

import { PageContainer, Loader } from "@/components";
import { Body, Header, UserDetails } from "./components";
import { useProfileStore } from "./stores";
import { getPushNotificationsEnabled, showToast } from "@/utils";

export const ProfileScreen = () => {
  const { profile, profileLoading, profileError, fetchProfile, resetProfile } =
    useProfileStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const loadPreferences = useCallback(async () => {
    setNotificationsEnabled(await getPushNotificationsEnabled());
  }, []);

  const _getProfile = useCallback(() => {
    resetProfile();
    fetchProfile();
  }, [fetchProfile, resetProfile]);

  useEffect(() => {
    return () => {
      resetProfile();
    };
  }, [resetProfile]);

  useEffect(() => {
    loadPreferences();
    _getProfile();
  }, [_getProfile, loadPreferences]);

  useEffect(() => {
    if (profileError && profileError.length > 0) {
      showToast(profileError, "error");
    }
  }, [profileError]);

  const _handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("role");

    resetProfile();
    showToast("Logout Successful", "success");
  };

  const _renderProfile = () => {
    if (profileLoading) {
      return <Loader />;
    }

    if (profile) {
      return (
        <ScrollView>
          <Body data={profile} />
          <UserDetails
            userDetails={profile}
            handleLogOut={_handleLogout}
            notificationsEnabled={notificationsEnabled}
          />
        </ScrollView>
      );
    }

    return null;
  };

  return (
    <>
      <Header />
      <PageContainer isLightStatusBar>{_renderProfile()}</PageContainer>
    </>
  );
};
