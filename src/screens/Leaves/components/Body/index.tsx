/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { LEAVE_CONFIG } from "../../config";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts } from "@/assets";

export interface IBody {}

export const Body = ({}: IBody) => {
  const { theme } = useTheme();
  const [category, setCategory] = useState("All");

  const _renderChip = () => {
    return (
      <View
        style={StyleSheet.flatten([
          S.chipContainer,
          { backgroundColor: theme.colors.white },
        ])}
      >
        {LEAVE_CONFIG.chips.map((chip, index) => {
          const isActive = category === chip;

          return (
            <TouchableOpacity
              key={chip}
              activeOpacity={0.8}
              onPress={() => setCategory(chip)}
            >
              {isActive ? (
                <LinearGradient
                  colors={["#01B5A7", "#0B62AA"] as const}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={StyleSheet.flatten([S.chip])}
                >
                  <Text
                    style={StyleSheet.flatten([
                      S.text,
                      { color: theme.colors.white },
                      { fontFamily: Fonts.semibold },
                    ])}
                  >
                    {chip}
                  </Text>
                </LinearGradient>
              ) : (
                <View
                  style={StyleSheet.flatten([
                    S.chip,
                    { borderWidth: 0.5, borderColor: theme.colors.chipBorder },
                  ])}
                >
                  <Text style={StyleSheet.flatten([S.text])}>{chip}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const _renderHeader = () => {
    return (
      <View
        style={StyleSheet.flatten([
          S.headerContainer,
          { backgroundColor: theme.colors.white },
        ])}
      >
        {_renderChip()}
      </View>
    );
  };

  return (
    <View
      style={StyleSheet.flatten([
        S.container,
        { backgroundColor: theme.colors.white },
      ])}
    >
      {_renderHeader()}
    </View>
  );
};
