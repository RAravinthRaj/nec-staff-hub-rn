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

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { theme } = useThemeMode();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const checkAuth = async () => {
    const token = await SecureStore.getItemAsync("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const interval = setInterval(checkAuth, 300);
    return () => clearInterval(interval);
  }, []);

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
