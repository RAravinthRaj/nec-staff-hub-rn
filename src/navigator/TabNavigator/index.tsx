/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import { View } from "react-native";
import { TAB_CONFIG } from "@/config/tab.config";
import { UserRole } from "@/utils";
import { CustomTabBar } from "../CustomTabBar";
import { Loader } from "@/components";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const loadRole = async () => {
      const storedRole = await SecureStore.getItemAsync("role");

      if (
        storedRole === "STAFF" ||
        storedRole === "HOD" ||
        storedRole === "HR" ||
        storedRole === "OA"
      ) {
        setRole(storedRole);
      } else {
        setRole("STAFF");
      }
    };

    loadRole();
  }, []);

  if (!role) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Loader />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {TAB_CONFIG[role].map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{ icon: tab.icon }}
        />
      ))}
    </Tab.Navigator>
  );
};
