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
import { RadioButton } from "react-native-paper";

export interface IStudentList {
  studentsData: any;
}

export const STATUS_MAP: Record<string, string> = {
  present: "P",
  absent: "A",
  onDuty: "OD",
};

export const REVERSE_STATUS_MAP: Record<string, string> = {
  P: "present",
  A: "absent",
  OD: "onDuty",
};

export const StudentList = ({ studentsData }: IStudentList) => {
  const { theme } = useTheme();

  const [attendance, setAttendance] = useState<Record<string, string | null>>(
    () => {
      const initial: Record<string, string | null> = {};
      studentsData.forEach((student: any) => {
        initial[student.rollNumber] = STATUS_MAP[student.status] ?? null;
      });
      return initial;
    }
  );

  const onSelectType = (rollNumber: string, value: string) => {
    setAttendance((prev) => {
      const isSameSelected = prev[rollNumber] === value;

      const updatedAttendance = {
        ...prev,
        [rollNumber]: isSameSelected ? null : value,
      };

      return updatedAttendance;
    });
  };

  const _renderRadioButton = (
    rollNumber: string,
    selectedType: string,
    color: string
  ) => {
    const isSelected = attendance[rollNumber] === selectedType;

    return (
      <View style={StyleSheet.flatten([S.radioButton])}>
        <RadioButton
          value={selectedType}
          status={isSelected ? "checked" : "unchecked"}
          onPress={() => onSelectType(rollNumber, selectedType)}
          color={color}
        />
      </View>
    );
  };

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
              key={student.rollNumber}
              style={StyleSheet.flatten([
                S.titleContainer,
                isLast && S.lastStyle,
                {
                  backgroundColor:
                    index % 2 !== 0
                      ? theme.colors.white
                      : theme.colors.tertiaryBackground,
                  borderColor: theme.colors.border,
                },
              ])}
            >
              <View style={StyleSheet.flatten([S.titleItem])}>
                <Text
                  style={StyleSheet.flatten([
                    S.titleText,
                    { color: theme.colors.black },
                  ])}
                >
                  {student.rollNumber}
                </Text>
              </View>

              <View style={StyleSheet.flatten([S.titleItem])}>
                <Text
                  style={StyleSheet.flatten([
                    S.titleText,
                    { color: theme.colors.black },
                  ])}
                >
                  {student.name}
                </Text>
              </View>

              <View
                style={StyleSheet.flatten([
                  S.titleItem,
                  { flexDirection: "row" },
                ])}
              >
                {_renderRadioButton(
                  student.rollNumber,
                  "P",
                  theme.colors.badgeGreen
                )}
                {_renderRadioButton(student.rollNumber, "A", theme.colors.red)}
                {_renderRadioButton(
                  student.rollNumber,
                  "OD",
                  theme.colors.orange
                )}
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
