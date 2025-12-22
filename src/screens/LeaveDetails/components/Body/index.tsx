/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { LEAVE_DETAIL_CONFIG } from "../../config";
import ElevatedView from "react-native-elevated-view";
import { Fonts } from "@/assets";

export interface Leave {
  status: "Pending" | "Approved" | "Rejected";
  startDate: string;
  endDate: string;
  applicationDate: string;
  category: string;
  type: string;
  numberOfDays: number;
  reason?: string;
  comments?: string;
  documents?: React.ReactNode[];
}

export interface IBody {
  leave: Leave;
}

export const Body = ({ leave }: IBody) => {
  const { theme } = useTheme();

  const renderStatus = () => {
    const status = leave.status;
    const colorKey = LEAVE_DETAIL_CONFIG.color[status.toLowerCase()] ?? "gray";
    const backgroundKey = `${colorKey}Background`;

    return (
      <View style={StyleSheet.flatten([S.dataContainer])}>
        <Text
          style={StyleSheet.flatten([
            S.keyText,
            { color: theme.colors.black, opacity: 0.5 },
          ])}
        >
          {LEAVE_DETAIL_CONFIG.status}
        </Text>

        <ElevatedView
          style={StyleSheet.flatten([
            S.statusContainer,
            { backgroundColor: theme.colors[backgroundKey] },
          ])}
        >
          <Text
            style={StyleSheet.flatten([
              S.statusText,
              {
                color: theme.colors[colorKey],
                fontFamily: Fonts.regular,
              },
            ])}
          >
            {status}
          </Text>
        </ElevatedView>
      </View>
    );
  };

  const renderButton = () => {
    if (leave.status !== LEAVE_DETAIL_CONFIG.pending) return null;

    return (
      <ElevatedView
        style={StyleSheet.flatten([S.buttonContainer])}
        elevation={5}
      >
        <TouchableOpacity
          style={StyleSheet.flatten([
            S.button,
            { backgroundColor: theme.colors.red },
          ])}
          activeOpacity={0.8}
        >
          <Text
            style={StyleSheet.flatten([
              S.buttonTitle,
              { color: theme.colors.white, fontFamily: Fonts.semibold },
            ])}
          >
            {LEAVE_DETAIL_CONFIG.buttonTitle}
          </Text>
        </TouchableOpacity>
      </ElevatedView>
    );
  };

  const renderDocuments = () => {
    if (!leave.documents?.length) {
      return (
        <Text style={StyleSheet.flatten([S.valueText])}>
          {LEAVE_DETAIL_CONFIG.noDocumentsFound}
        </Text>
      );
    }

    return leave.documents;
  };

  const renderKeyValue = (label: string, value?: string | number) => (
    <View style={StyleSheet.flatten([S.dataContainer])}>
      <Text
        style={StyleSheet.flatten([
          S.keyText,
          { color: theme.colors.black, opacity: 0.5 },
        ])}
      >
        {label}
      </Text>
      <Text style={StyleSheet.flatten([S.valueText])}>{value ?? "-"}</Text>
    </View>
  );

  const renderRow = (items: { label: string; value?: string | number }[]) => (
    <View
      style={StyleSheet.flatten([
        S.rowContainer,
        { backgroundColor: theme.colors.white },
      ])}
    >
      {items.map((item) => (
        <View key={item.label}>{renderKeyValue(item.label, item.value)}</View>
      ))}
    </View>
  );

  return (
    <ScrollView
      style={StyleSheet.flatten([
        S.container,
        { backgroundColor: theme.colors.white },
      ])}
    >
      <View>
        <View
          style={StyleSheet.flatten([
            S.headerContainer,
            { backgroundColor: theme.colors.white },
          ])}
        >
          <View
            style={StyleSheet.flatten([
              S.rowContainer,
              { backgroundColor: theme.colors.white },
            ])}
          >
            {renderStatus()}
            {renderRow([
              { label: LEAVE_DETAIL_CONFIG.startDate, value: leave.startDate },
              { label: LEAVE_DETAIL_CONFIG.category, value: leave.category },
              {
                label: LEAVE_DETAIL_CONFIG.numberOfDays,
                value: leave.numberOfDays,
              },
            ])}
          </View>

          <View
            style={StyleSheet.flatten([
              S.rowContainer,
              { backgroundColor: theme.colors.white },
            ])}
          >
            {renderRow([
              {
                label: LEAVE_DETAIL_CONFIG.applicationDate,
                value: leave.applicationDate,
              },
              { label: LEAVE_DETAIL_CONFIG.endDate, value: leave.endDate },
              { label: LEAVE_DETAIL_CONFIG.type, value: leave.type },
            ])}
          </View>
        </View>

        <View
          style={StyleSheet.flatten([
            S.headerContainer,
            { backgroundColor: theme.colors.white },
          ])}
        >
          <View
            style={StyleSheet.flatten([
              S.rowContainer,
              { backgroundColor: theme.colors.white },
            ])}
          >
            {renderRow([
              { label: LEAVE_DETAIL_CONFIG.reason, value: leave.reason },
              { label: LEAVE_DETAIL_CONFIG.comments, value: leave.comments },
            ])}

            <View style={StyleSheet.flatten([S.dataContainer])}>
              <Text
                style={StyleSheet.flatten([
                  S.keyText,
                  { color: theme.colors.black, opacity: 0.5 },
                ])}
              >
                {LEAVE_DETAIL_CONFIG.documents}
              </Text>

              <View style={StyleSheet.flatten([S.documentContainer])}>
                {renderDocuments()}
              </View>
            </View>
          </View>
        </View>

        {renderButton()}
      </View>
    </ScrollView>
  );
};
