/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@rneui/themed";
import { styles as S } from "./styles";

const TAB_BAR_HEIGHT = 72;
const H_PADDING = 12;
const ITEM_MARGIN = 6;

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const stableBottomInset = useRef(insets.bottom).current;

  const { width } = Dimensions.get("window");
  const TAB_WIDTH = (width - H_PADDING * 2) / state.routes.length;

  const translateX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      damping: 14,
      stiffness: 120,
      mass: 0.8,
    }).start();
  }, [state.index, TAB_WIDTH]);

  return (
    <View
      style={StyleSheet.flatten([
        S.container,
        {
          height: TAB_BAR_HEIGHT,
          paddingBottom: stableBottomInset,
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.border,
        },
      ])}
    >
      <Animated.View
        style={StyleSheet.flatten([
          S.animatedPill,
          {
            width: TAB_WIDTH - ITEM_MARGIN * 2,
            transform: [{ translateX }],
            backgroundColor: theme.colors.primary,
          },
        ])}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const icon = (options as any).icon;
        const iconConfig = isFocused ? icon.focused : icon.unfocused;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={StyleSheet.flatten(StyleSheet.flatten([S.tabItem]))}
            activeOpacity={0.85}
          >
            <Icon
              name={iconConfig.name}
              type={iconConfig.type}
              size={22}
              color={isFocused ? theme.colors.white : theme.colors.black}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
