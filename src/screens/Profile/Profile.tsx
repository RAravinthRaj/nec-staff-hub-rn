/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { useEffect } from "react";
import { ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";

import { PageContainer, Loader } from "@/components";
import { Body, Header, UserDetails } from "./components";
import { useProfileStore } from "./stores";
import { getItemInLocalStorage, showToast } from "@/utils";

export const ProfileScreen = () => {
  const { profile, profileLoading, profileError, fetchProfile, resetProfile } =
    useProfileStore();

  useEffect(() => {
    _getProfile();
    return () => {
      resetProfile();
    };
  }, []);

  const _getProfile = () => {
    fetchProfile();
  };

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
          <UserDetails userDetails={profile} handleLogOut={_handleLogout} />
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
