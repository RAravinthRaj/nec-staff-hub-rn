/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Text, StyleSheet, View, ScrollView } from "react-native";
import { styles as S } from "./styles";
import { useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { CustomSwitch } from "../Switch";

export interface IStudentList {
  studentsData: any;
}

export const StudentList = ({ studentsData }: IStudentList) => {
  const { theme } = useTheme();

  const _renderData = () => {
    return (
      <View
        style={StyleSheet.flatten([
          S.mainTitleContainer,
          {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.border,
          },
        ])}
      >
        {studentsData.map((student: any, index: number) => {
          const isLast = index === studentsData.length - 1;

          return (
            <View
              style={StyleSheet.flatten([
                S.titleContainer,
                isLast && S.lastStyle,
                {
                  backgroundColor:
                    index % 2 != 0
                      ? theme.colors.white
                      : theme.colors.tertiaryBackground,
                  borderColor: theme.colors.border,
                  pointerEvents: student?.status === "onDuty" ? "none" : "auto",
                },
              ])}
              key={index}
            >
              <View style={StyleSheet.flatten([S.titleItem])}>
                <Text
                  style={StyleSheet.flatten([
                    S.titleText,
                    {
                      color: theme.colors.black,
                      opacity: student?.status === "onDuty" ? 0.4 : 1,
                    },
                  ])}
                >
                  {student.rollNumber}
                </Text>
              </View>

              <View style={StyleSheet.flatten([S.titleItem])}>
                <Text
                  style={StyleSheet.flatten([
                    S.titleText,
                    {
                      color: theme.colors.black,
                      opacity: student?.status === "onDuty" ? 0.4 : 1,
                    },
                  ])}
                >
                  {student.name}
                </Text>
              </View>

              <View style={StyleSheet.flatten([S.titleItem])}>
                <CustomSwitch status={student.status} />
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView
      style={StyleSheet.flatten([
        S.container,
        { backgroundColor: theme.colors.white },
      ])}
      contentContainerStyle={{ alignSelf: "center" }}
    >
      {_renderData()}
    </ScrollView>
  );
};
