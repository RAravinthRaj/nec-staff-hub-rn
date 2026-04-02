/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { BottomSheet, Icon, useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { DropDown } from "../DropDown";
import { OA_HOME_CONFIG } from "../../config";
import { DateInput } from "../DateInput";
import ElevatedView from "react-native-elevated-view";
import { Fonts } from "@/assets";
import { showToast } from "@/utils";

export interface IBody {}

export const Body = () => {
  const { theme } = useTheme();
  const [year, setYear] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [searchData, setSearchData] = useState<string>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const markAllPresent = () => {
    // setAttendance((prev) => {
    //   const updated: Record<string, string> = {};
    //   Object.keys(prev).forEach((key) => {
    //     updated[key] = "P";
    //   });
    //   return updated;
    // });

    setIsVisible(false);
  };

  const markAllAbsent = () => {
    // setAttendance((prev) => {
    //   const updated: Record<string, string> = {};
    //   Object.keys(prev).forEach((key) => {
    //     updated[key] = "A";
    //   });
    //   return updated;
    // });

    setIsVisible(false);
  };

  const _renderTitle = (title: string) => {
    return (
      <View style={StyleSheet.flatten([S.headerText])}>
        <Text style={StyleSheet.flatten([S.titleText])}>{title}</Text>

        <Text
          style={StyleSheet.flatten([
            S.typeText,
            { color: theme.colors.red, margin: 5 },
          ])}
        >
          {OA_HOME_CONFIG.star}
        </Text>
      </View>
    );
  };

  const _renderDate = () => {
    return (
      <View style={StyleSheet.flatten([S.dateContainer])}>
        <View style={StyleSheet.flatten([S.date, { flex: 0.5 }])}>
          {_renderTitle(OA_HOME_CONFIG.startDate)}
          <DateInput value={fromDate} onChange={setFromDate} />
        </View>
        <View style={StyleSheet.flatten([S.date, { flex: 0.5 }])}>
          {_renderTitle(OA_HOME_CONFIG.endDate)}
          <DateInput value={endDate} onChange={setEndDate} />
        </View>
      </View>
    );
  };

  const _renderDropDown = () => {
    return (
      <View style={StyleSheet.flatten([S.categoryContainer])}>
        <View>
          {_renderTitle(OA_HOME_CONFIG.year)}
          <DropDown
            value={year}
            placeholder="-- Select --"
            items={OA_HOME_CONFIG.years}
            onChange={setYear}
          />
        </View>
        <View>
          {_renderTitle(OA_HOME_CONFIG.department)}
          <DropDown
            value={department}
            placeholder="-- Select --"
            items={OA_HOME_CONFIG.departments}
            onChange={setDepartment}
          />
        </View>
      </View>
    );
  };

  const _renderSearchIcon = () => {
    if (!searchData) return null;

    return (
      <View
        style={StyleSheet.flatten([S.icons])}
        onStartShouldSetResponderCapture={() => true}
        onTouchStart={() => {
          setSearchData("");
        }}
      >
        <Icon
          name="close"
          type="ionicons"
          size={17}
          color="white"
          style={StyleSheet.flatten([
            S.search,
            { backgroundColor: theme.colors.secondary },
          ])}
        />
      </View>
    );
  };

  const _renderMenu = () => {
    return (
      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        modalProps={{
          animationType: "slide",
          transparent: true,
        }}
        containerStyle={S.backdrop}
      >
        <View
          style={StyleSheet.flatten([
            S.sheet,
            { backgroundColor: theme.colors.white },
          ])}
        >
          <View style={StyleSheet.flatten([S.bottomTextContainer])}>
            <Text style={StyleSheet.flatten([S.bottomText])}>
              {OA_HOME_CONFIG.modalTitle}
            </Text>
            <Text style={StyleSheet.flatten([S.bottomSubText])}>
              {OA_HOME_CONFIG.modalSubTitle}
            </Text>
          </View>

          <View style={StyleSheet.flatten([S.bottomButtonContainer])}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={markAllAbsent}
              style={StyleSheet.flatten([
                S.button,
                { borderColor: theme.colors.primary, borderWidth: 2 },
              ])}
            >
              <Text
                style={StyleSheet.flatten([
                  S.text,
                  { color: theme.colors.primary },
                ])}
              >
                {OA_HOME_CONFIG.markAllAbsent}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={markAllPresent}
              style={StyleSheet.flatten([
                S.button,
                { backgroundColor: theme.colors.primary },
              ])}
            >
              <Text
                style={StyleSheet.flatten([
                  S.text,
                  { color: theme.colors.white },
                ])}
              >
                {OA_HOME_CONFIG.markAllPresent}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    );
  };

  const _renderSearchBar = () => {
    return (
      <View style={StyleSheet.flatten([S.searchBarContainer])}>
        <ElevatedView
          elevation={3}
          style={StyleSheet.flatten([
            S.searchBarElevatedContainer,
            {
              borderRadius: 12,
            },
          ])}
        >
          <TextInput
            style={StyleSheet.flatten([
              S.input,
              {
                borderColor: theme.colors.border,
              },
            ])}
            returnKeyType="send"
            placeholder="Search Name, Roll No..."
            onChangeText={(text) => setSearchData(text)}
            value={searchData}
            autoFocus={false}
            onSubmitEditing={() => console.log("Submitted")}
          />
          {_renderSearchIcon()}
        </ElevatedView>

        <ElevatedView
          style={StyleSheet.flatten([S.buttonContainer])}
          elevation={5}
        >
          <TouchableOpacity
            style={StyleSheet.flatten([
              S.button,
              {
                backgroundColor: theme.colors.primary,
              },
            ])}
            activeOpacity={0.8}
          >
            <Text
              style={StyleSheet.flatten([
                S.buttonTitle,
                { color: theme.colors.white, fontFamily: Fonts.semibold },
              ])}
            >
              {OA_HOME_CONFIG.buttonTitle}
            </Text>
          </TouchableOpacity>
        </ElevatedView>

        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          activeOpacity={0.2}
          hitSlop={15}
        >
          <Icon name="dots-three-vertical" type="entypo" size={25} />
        </TouchableOpacity>
        {_renderMenu()}
      </View>
    );
  };

  const _renderTitleText = (title: string) => {
    return (
      <Text
        style={StyleSheet.flatten([S.titleText, { color: theme.colors.white }])}
      >
        {title}
      </Text>
    );
  };

  const _renderDetailsTitle = () => {
    return (
      <View
        style={StyleSheet.flatten([
          S.titleContainer,
          {
            backgroundColor: theme.colors.secondary,
            borderColor: theme.colors.primary,
          },
        ])}
      >
        <View style={StyleSheet.flatten([S.titleItem])}>
          {_renderTitleText(OA_HOME_CONFIG.roll)}
          {_renderTitleText(OA_HOME_CONFIG.number)}
        </View>

        <View style={StyleSheet.flatten([S.titleItem])}>
          {_renderTitleText(OA_HOME_CONFIG.name)}
        </View>

        <View
          style={StyleSheet.flatten([
            S.titleItem,
            {
              flexDirection: "row",
              justifyContent: "space-around",
              margin: 5,
            },
          ])}
        >
          {_renderTitleText(OA_HOME_CONFIG.present)}
          {_renderTitleText(OA_HOME_CONFIG.absent)}
          {_renderTitleText(OA_HOME_CONFIG.onDuty)}
        </View>
      </View>
    );
  };

  const _renderHeader = () => {
    return (
      <View style={StyleSheet.flatten([S.headerContainer])}>
        {_renderDropDown()}
        {_renderDate()}
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
      {_renderSearchBar()}
      {_renderDetailsTitle()}
    </View>
  );
};
