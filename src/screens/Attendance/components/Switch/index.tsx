/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { styles as S } from "./styles";
import { ATTENDANCE_CONFIG } from "../../config";

export interface ICustomSwitch {
  status: string;
}

export const CustomSwitch = ({ status }: ICustomSwitch) => {
  const [changeStatus, setChangeStatus] = useState(status);

  const _toggleStatus = () => {
    if (changeStatus === "present") {
      setChangeStatus("absent");
      return;
    }

    setChangeStatus("present");
  };

  return (
    <TouchableOpacity
      onPress={_toggleStatus}
      activeOpacity={0.7}
      style={StyleSheet.flatten([
        S.container,
        {
          borderColor: ATTENDANCE_CONFIG.color[changeStatus].color,
          flexDirection: changeStatus === "present" ? "row-reverse" : "row",
        },
      ])}
    >
      <View
        style={StyleSheet.flatten([
          S.dot,
          {
            backgroundColor: ATTENDANCE_CONFIG.color[changeStatus].color,
            alignItems: changeStatus === "absent" ? "flex-start" : "flex-end",
          },
        ])}
      />

      <Text
        style={StyleSheet.flatten([
          S.text,
          { color: ATTENDANCE_CONFIG.color[changeStatus].color },
        ])}
      >
        {changeStatus === "onDuty" ? "on-duty" : changeStatus}
      </Text>
    </TouchableOpacity>
  );
};
