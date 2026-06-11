/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useThemeMode } from "@/hooks";
import { Platform } from "react-native";

import {
  LandingScreen,
  LoginScreen,
  OtpScreen,
  AttendanceScreen,
  LeaveScreen,
  LeaveDetailScreen,
  LeaveRequestScreen,
  ProfileScreen,
  NotificationScreen,
  LeaveIntimationScreen,
  LeaveApprovalScreen,
  LeaveApprovalDetailScreen,
  OAHomeScreen,
} from "@/screens";

import { TabNavigator } from "./TabNavigator";
import { Loader } from "@/components";
import { View } from "react-native";
import {
  configurePushNotifications,
  clearStoredExpoPushToken,
  getPushNotificationsEnabled,
  getStoredExpoPushToken,
  registerForPushNotificationsAsync,
  setStoredExpoPushToken,
  showToast,
} from "@/utils";
import { useNotificationStore } from "@/screens/Notification/stores";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { theme } = useThemeMode();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [pushNotificationsEnabled, setPushNotificationsEnabledState] =
    useState(false);
  const { registerPushToken, unregisterPushToken } = useNotificationStore();

  const checkAuth = async () => {
    const token = await SecureStore.getItemAsync("token");
    setIsLoggedIn(!!token);
    setPushNotificationsEnabledState(await getPushNotificationsEnabled());
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const interval = setInterval(checkAuth, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const syncPushPreference = async () => {
      try {
        if (pushNotificationsEnabled) {
          if (!configurePushNotifications()) {
            showToast("Push notifications are not available in this build.", "info");
            return;
          }

          const expoPushToken = await registerForPushNotificationsAsync();

          if (!expoPushToken) {
            return;
          }

          await registerPushToken(expoPushToken, Platform.OS);
          await setStoredExpoPushToken(expoPushToken);
          return;
        }

        const storedToken = await getStoredExpoPushToken();

        if (!storedToken) {
          return;
        }

        await unregisterPushToken(storedToken);
        await clearStoredExpoPushToken();
      } catch (_) {
        showToast("Push notification preference could not be updated.", "info");
      }
    };

    syncPushPreference();
  }, [
    isLoggedIn,
    pushNotificationsEnabled,
    registerPushToken,
    unregisterPushToken,
  ]);

  if (isLoggedIn === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <Loader />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Otp" component={OtpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={TabNavigator} />

            <Stack.Screen name="Attendance" component={AttendanceScreen} />
            <Stack.Screen name="Leaves" component={LeaveScreen} />
            <Stack.Screen name="LeaveDetails" component={LeaveDetailScreen} />
            <Stack.Screen name="LeaveRequest" component={LeaveRequestScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen
              name="LeaveIntimation"
              component={LeaveIntimationScreen}
            />
            <Stack.Screen
              name="LeaveApproval"
              component={LeaveApprovalScreen}
            />
            <Stack.Screen
              name="LeaveApprovalDetails"
              component={LeaveApprovalDetailScreen}
            />
            <Stack.Screen name="OAHomeScreen" component={OAHomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
