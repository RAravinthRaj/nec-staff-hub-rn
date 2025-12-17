/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import { useTheme } from "@rneui/themed";
import ElevatedView from "react-native-elevated-view";
import Entypo from "@expo/vector-icons/Entypo";
import { Fonts } from "@/assets";
import { HOME_CONFIG } from "../../config";
import { styles as S } from "./styles";

export interface IAccordian {
  data: any;
  date: string;
}

export const Accordion = ({ data, date }: IAccordian) => {
  const [expanded, setExpanded] = useState(false);
  const { theme } = useTheme();

  const startTime = data?.startTime;
  const endTime = data?.endTime;

  useEffect(() => {
    getBatchStatus();
  }, [data]);

  const toggleAccordion = () => {
    setExpanded((prev) => !prev);
  };

  const convertTo24Hour = (time12h?: string): string | null => {
    if (!time12h) return null;

    const formatted = time12h.trim().toUpperCase();
    const [time, modifier] = formatted.split(" ");
    if (!time || !modifier) return null;

    let [hour, minute] = time.split(":");
    let h = parseInt(hour, 10);

    if (modifier === "PM" && h !== 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;

    return `${String(h).padStart(2, "0")}:${minute}`;
  };

  const getBatchStatus = () => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const batch = new Date(date);

    if (batch < new Date(todayStr)) return "Completed";
    if (batch > new Date(todayStr)) return "Upcoming";

    if (date === todayStr) {
      const start24 = convertTo24Hour(startTime);
      const end24 = convertTo24Hour(endTime);
      if (!start24 || !end24) return "Upcoming";

      const now = today.getTime();
      const start = new Date(`${date}T${start24}`).getTime();
      const end = new Date(`${date}T${end24}`).getTime();

      if (now > end) return "Completed";
      if (now >= start && now <= end) return "Ongoing";
      return "Upcoming";
    }

    return "Upcoming";
  };

  const _renderBadge = () => {
    const status = getBatchStatus();

    const background =
      status === "Completed"
        ? theme.colors.red
        : status === "Ongoing"
        ? theme.colors.white
        : theme.colors.primary;

    const borderColor =
      status === "Completed"
        ? theme.colors.red
        : status === "Ongoing"
        ? theme.colors.badgeGreen
        : theme.colors.white;

    const textColor =
      status === "Ongoing" ? theme.colors.badgeGreen : theme.colors.white;

    return (
      <View
        style={StyleSheet.flatten([
          S.badgeContainer,
          { backgroundColor: background, borderColor },
        ])}
      >
        <Text style={StyleSheet.flatten([S.badge, { color: textColor }])}>
          {status}
        </Text>
      </View>
    );
  };

  const _renderHeader = () => (
    <View style={StyleSheet.flatten([S.cardContainer])}>
      <View
        style={StyleSheet.flatten([
          S.logoContainer,
          {
            backgroundColor: expanded
              ? theme.colors.white
              : theme.colors.secondary,
          },
        ])}
      >
        <Text
          style={StyleSheet.flatten([
            S.logo,
            {
              color: expanded ? theme.colors.secondary : theme.colors.white,
            },
          ])}
        >
          {data?.subName.charAt(10)}
        </Text>
      </View>

      <View style={StyleSheet.flatten([S.textContainer])}>
        <Text
          numberOfLines={1}
          style={StyleSheet.flatten([
            S.subName,
            { color: expanded ? theme.colors.white : theme.colors.black },
          ])}
        >
          {data.subName.substring(0, 25) + "..."}
        </Text>

        <View style={StyleSheet.flatten([S.timeContainer])}>
          <Text
            style={StyleSheet.flatten([
              S.time,
              { color: expanded ? theme.colors.white : theme.colors.primary },
            ])}
          >
            {data.startTime} - {data.endTime}
          </Text>

          {_renderBadge()}
        </View>
      </View>

      <View style={StyleSheet.flatten([S.arrowContainer])}>
        <Entypo
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={expanded ? "white" : "black"}
        />
      </View>
    </View>
  );

  const _renderSubContent = (key: string, value: any) => (
    <View style={StyleSheet.flatten([S.yearContainer])}>
      <View style={S.yearSubContainer}>
        <Text style={S.styledKey}>{key}</Text>
      </View>
      <View style={S.yearSubContainer}>
        <Text style={S.styledValue}>{value}</Text>
      </View>
    </View>
  );

  const _renderButton = () => (
    <ElevatedView style={S.buttonContainer} elevation={5}>
      <TouchableOpacity
        style={[S.button, { backgroundColor: theme.colors.primary }]}
        activeOpacity={0.8}
      >
        <Text
          style={[
            S.buttonTitle,
            { color: theme.colors.white, fontFamily: Fonts.semibold },
          ]}
        >
          {HOME_CONFIG.attendanceButton}
        </Text>
      </TouchableOpacity>
    </ElevatedView>
  );

  const _renderBody = () => (
    <View style={S.bodyContainer}>
      <Text style={S.bodyTitle}>{data?.subName}</Text>

      <View style={S.yearMainContainer}>
        {_renderSubContent(HOME_CONFIG.batch, data?.batch)}
        {_renderSubContent(HOME_CONFIG.year, data?.year)}
      </View>

      {_renderSubContent(HOME_CONFIG.faculty, data?.faculty)}
      {_renderSubContent(HOME_CONFIG.semester, data?.semester)}
      {_renderButton()}
    </View>
  );

  return (
    <ElevatedView
      style={StyleSheet.flatten([
        S.accordionContainer,
        {
          backgroundColor: expanded
            ? theme.colors.secondary
            : theme.colors.white,
          borderColor: theme.colors.border,
        },
      ])}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleAccordion}
        style={S.header}
      >
        {_renderHeader()}
      </TouchableOpacity>

      <Collapsible collapsed={!expanded} duration={280}>
        <View
          style={[
            S.contentContainer,
            {
              borderWidth: expanded ? 1 : 0,
              borderColor: theme.colors.secondary,
              backgroundColor: theme.colors.white,
            },
          ]}
        >
          {_renderBody()}
        </View>
      </Collapsible>
    </ElevatedView>
  );
};

export default Accordion;
