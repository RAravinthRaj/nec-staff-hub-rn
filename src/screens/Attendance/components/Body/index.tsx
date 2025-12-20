/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { use, useRef, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Icon, useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { Fonts, Images } from "@/assets";
import { ATTENDANCE_CONFIG } from "../../config";
import ElevatedView from "react-native-elevated-view";
import Ionicons from "@expo/vector-icons/Ionicons";

export interface IBody {
  statsData: any;
}

export const Body = ({ statsData }: IBody) => {
  const { theme } = useTheme();
  const [searchData, setSearchData] = useState("");
  const [open, setOpen] = useState(false);

  const _renderCard = ({ item }: any) => {
    return (
      <View
        style={StyleSheet.flatten([
          S.card,
          { backgroundColor: theme.colors[item.color] },
        ])}
      >
        <View style={StyleSheet.flatten([S.imageContainer])}>
          <Image
            source={Images[item.image]}
            style={StyleSheet.flatten([S.image])}
          />
        </View>
        <View style={StyleSheet.flatten([S.detailContainer])}>
          <Text
            style={StyleSheet.flatten([
              S.detail,
              { color: theme.colors.white, fontFamily: Fonts.bold },
            ])}
          >
            {statsData[item.image]}
          </Text>
          <Text
            style={StyleSheet.flatten([
              S.description,
              { color: theme.colors.white, fontFamily: Fonts.semibold },
            ])}
          >
            {item?.description}
          </Text>
        </View>
      </View>
    );
  };

  const _renderStatistics = () => {
    return (
      <FlatList
        data={ATTENDANCE_CONFIG.statsDetails}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        renderItem={_renderCard}
        columnWrapperStyle={{ gap: 5 }}
        contentContainerStyle={StyleSheet.flatten([S.headerContainer])}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
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
      <Modal transparent visible={open}>
        <TouchableOpacity
          style={StyleSheet.flatten([{ flex: 1 }])}
          onPress={() => setOpen(false)}
        />
        <ElevatedView
          style={StyleSheet.flatten([
            S.modalStyle,
            {
              backgroundColor: theme.colors.secondaryBackground,
              borderColor: theme.colors.border,
            },
          ])}
          elevation={2}
        >
          <TouchableOpacity
            activeOpacity={0.2}
            style={StyleSheet.flatten([
              S.item,
              {
                borderBottomWidth: 0.2,
                borderColor: theme.colors.border,
              },
            ])}
            onPress={() => {
              setOpen(false);
            }}
          >
            <Ionicons
              type="ionicons"
              name="checkmark-circle-outline"
              size={22}
              color="black"
            />
            <Text
              style={StyleSheet.flatten([
                S.text,
                { fontFamily: Fonts.regular },
              ])}
            >
              {ATTENDANCE_CONFIG.markAllPresent}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            style={StyleSheet.flatten([S.item])}
            onPress={() => {
              setOpen(false);
            }}
          >
            <Ionicons
              type="ionicons"
              name="close-circle-outline"
              size={22}
              color="black"
            />
            <Text
              style={StyleSheet.flatten([
                S.text,
                { fontFamily: Fonts.regular },
              ])}
            >
              {ATTENDANCE_CONFIG.markAllAbsent}
            </Text>
          </TouchableOpacity>
        </ElevatedView>
      </Modal>
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
        <TouchableOpacity
          onPress={() => setOpen(true)}
          activeOpacity={0.2}
          hitSlop={{ left: 20 }}
        >
          <Icon name="dots-three-vertical" type="entypo" size={25} />
        </TouchableOpacity>
        {_renderMenu()}
      </View>
    );
  };

  const _renderTitle = () => {
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
          <Text
            style={StyleSheet.flatten([
              S.titleText,
              { color: theme.colors.white },
            ])}
          >
            {ATTENDANCE_CONFIG.roll}
          </Text>
          <Text
            style={StyleSheet.flatten([
              S.titleText,
              { color: theme.colors.white },
            ])}
          >
            {ATTENDANCE_CONFIG.number}
          </Text>
        </View>

        <View style={StyleSheet.flatten([S.titleItem])}>
          <Text
            style={StyleSheet.flatten([
              S.titleText,
              { color: theme.colors.white },
            ])}
          >
            {ATTENDANCE_CONFIG.name}
          </Text>
        </View>

        <View style={StyleSheet.flatten([S.titleItem])}>
          <Text
            style={StyleSheet.flatten([
              S.titleText,
              { color: theme.colors.white },
            ])}
          >
            {ATTENDANCE_CONFIG.status}
          </Text>
        </View>
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
        {_renderStatistics()}
        {_renderSearchBar()}
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
      {_renderTitle()}
    </View>
  );
};
