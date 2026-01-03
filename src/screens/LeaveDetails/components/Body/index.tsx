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
  fromHod: boolean;
}

export const Body = ({ leave, fromHod }: IBody) => {
  const { theme } = useTheme();

  const _renderHRStatus = (status: string) => {
    let title = "";
    if (status === LEAVE_DETAIL_CONFIG.approved) {
      title = status + " " + LEAVE_DETAIL_CONFIG.by;
      return _renderKeyValue(title, LEAVE_DETAIL_CONFIG.hrAdmin);
    }

    if (status === LEAVE_DETAIL_CONFIG.declined) {
      title = status + " " + LEAVE_DETAIL_CONFIG.by;
      return _renderKeyValue(title, LEAVE_DETAIL_CONFIG.hrAdmin);
    }
  };

  const _renderStatus = () => {
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

  const _renderButton = () => {
    if (leave.status !== LEAVE_DETAIL_CONFIG.pending || fromHod) return null;

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

  const _renderDocuments = () => {
    if (!leave.documents?.length) {
      return (
        <Text style={StyleSheet.flatten([S.valueText])}>
          {LEAVE_DETAIL_CONFIG.noDocumentsFound}
        </Text>
      );
    }

    return leave.documents;
  };

  const _renderKeyValue = (label: string, value?: string | number) => (
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

  const _renderRow = (items: { label: string; value?: string | number }[]) => (
    <View
      style={StyleSheet.flatten([
        S.rowContainer,
        { backgroundColor: theme.colors.white },
      ])}
    >
      {items.map((item) => (
        <View key={item.label}>{_renderKeyValue(item.label, item.value)}</View>
      ))}
    </View>
  );

  const _renderData = () => {
    return (
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
            {_renderStatus()}
            {_renderRow([
              { label: LEAVE_DETAIL_CONFIG.startDate, value: leave.startDate },
              { label: LEAVE_DETAIL_CONFIG.category, value: leave.category },
              {
                label: LEAVE_DETAIL_CONFIG.numberOfDays,
                value: leave.numberOfDays,
              },
            ])}

            {_renderHRStatus(leave?.status)}
          </View>

          <View
            style={StyleSheet.flatten([
              S.rowContainer,
              { backgroundColor: theme.colors.white },
            ])}
          >
            {_renderRow([
              {
                label: LEAVE_DETAIL_CONFIG.applicationDate,
                value: leave.applicationDate,
              },
              { label: LEAVE_DETAIL_CONFIG.endDate, value: leave.endDate },
              { label: LEAVE_DETAIL_CONFIG.type, value: leave.type },
            ])}

            {fromHod && _renderKeyValue("Applied By", leave?.facultyName)}
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
            {_renderRow([
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
                {_renderDocuments()}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={StyleSheet.flatten([
        S.container,
        { backgroundColor: theme.colors.white },
      ])}
      showsVerticalScrollIndicator={false}
    >
      {_renderData()}
      {_renderButton()}
    </ScrollView>
  );
};
