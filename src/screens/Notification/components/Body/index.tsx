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
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon, useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { Fonts } from "@/assets";

export interface IBody {
  notifications: any;
}

export const Body = ({ notifications }: IBody) => {
  const { theme } = useTheme();

  const _toggleType = (notification: any) => {
    notification.type = notification.type === "unread" ? "read" : "unread";
  };

  const _renderTime = (time: string) => {
    const createdAt = new Date(time);
    const now = new Date();

    const diffMs = Math.abs(now.getTime() - createdAt.getTime());

    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffDay > 0) {
      return `${diffDay}d`;
    }

    if (diffHr > 0) {
      return `${diffHr}h`;
    }

    return `${diffMin}m`;
  };

  const _renderSingleData = (notification: any, index: number) => {
    const isLast = index === notifications.length - 1;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={StyleSheet.flatten([
          S.notificationContainer,
          {
            borderBottomWidth: !isLast ? 0.5 : 0,
            backgroundColor:
              notification?.type === "unread"
                ? theme.colors.tertiaryBackground
                : theme.colors.white,
            borderColor: theme.colors.border,
            borderTopLeftRadius: index == 0 ? 10 : 0,
            borderTopRightRadius: index == 0 ? 10 : 0,
            borderBottomLeftRadius: index == notifications.length - 1 ? 10 : 0,
            borderBottomRightRadius: index == notifications.length - 1 ? 10 : 0,
          },
        ])}
        onPress={() => {
          _toggleType(notification);
        }}
      >
        <View style={S.notificationDetailContainer}>
          <View style={S.IconContainer}>
            <Icon
              type="ant-design"
              name="message"
              size={30}
              color={
                notification?.type === "unread"
                  ? theme.colors.black
                  : theme.colors.border
              }
            />
          </View>
          <View style={S.textContainer}>
            <Text
              style={StyleSheet.flatten([
                S.titleText,
                {
                  fontFamily:
                    notification?.type === "unread"
                      ? Fonts.bold
                      : Fonts.regular,
                },
              ])}
            >
              {notification.title}
            </Text>
            <Text style={S.text}>{notification.subtitle}</Text>
          </View>
        </View>

        <Text style={S.dateText}>{_renderTime(notification?.createdAt)}</Text>
      </TouchableOpacity>
    );
  };

  const _renderData = () => {
    return (
      <View>
        {notifications.map((notification: any, index: number) => {
          return (
            <View key={index}>{_renderSingleData(notification, index)}</View>
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
        {_renderData()}
      </View>
    );
  };

  return (
    <ScrollView
      style={StyleSheet.flatten([
        S.container,
        { backgroundColor: theme.colors.white },
      ])}
    >
      {_renderHeader()}
    </ScrollView>
  );
};
