/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles as S } from "./styles";
import { useTheme } from "@rneui/themed";
import { Fonts, Images } from "@/assets";
import { HOME_CONFIG } from "../../config";
import ElevatedView from "react-native-elevated-view";
import Accordion from "../Accordion";

export interface ISchedule {
  navigateToAttendance: () => void;
  date: string;
  data: any;
}

export const Schedules = ({ data, date, navigateToAttendance }: ISchedule) => {
  const { theme } = useTheme();

  const _renderImage = () => {
    return (
      <View style={StyleSheet.flatten([S.imageContainer])}>
        <Image
          source={Images.noData}
          style={StyleSheet.flatten([S.noDataImage])}
        />
      </View>
    );
  };

  const _renderButton = () => {
    return (
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
            {HOME_CONFIG.buttonTitle}
          </Text>
        </TouchableOpacity>
      </ElevatedView>
    );
  };

  const _renderNoClassFound = () => {
    return (
      <View style={StyleSheet.flatten([S.noDataContainer])}>
        {_renderImage()}
        <Text
          style={StyleSheet.flatten([S.noClass, { fontFamily: Fonts.bold }])}
        >
          {HOME_CONFIG.noClass}
        </Text>
        {_renderButton()}
      </View>
    );
  };

  const _renderPeriod = () => {
    return (
      <View>
        {data.map((item: any, index: any) => (
          <Accordion
            key={index}
            data={item}
            date={date}
            navigateToAttendance={navigateToAttendance}
          />
        ))}
      </View>
    );
  };

  const _renderHeader = () => {
    if (data) {
      return (
        <View style={StyleSheet.flatten([S.headerContainer])}>
          {_renderPeriod()}
        </View>
      );
    }

    return (
      <View style={StyleSheet.flatten([S.headerContainer])}>
        {_renderNoClassFound()}
      </View>
    );
  };

  return (
    <ScrollView style={StyleSheet.flatten([S.container])}>
      {_renderHeader()}
    </ScrollView>
  );
};
