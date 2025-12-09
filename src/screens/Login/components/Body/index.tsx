/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Images, Fonts } from "@/assets";
import { styles as S } from "./styles";
import { LOGIN_CONFIG } from "../../config";
import { useTheme } from "@rneui/themed";
import ElevatedView from "react-native-elevated-view";
import { useState } from "react";

export interface IBody {
  navigateToOtp: () => void;
}

export const Body = ({ navigateToOtp }: IBody) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");

  const _renderLandingImage = () => {
    return (
      <View style={StyleSheet.flatten([S.imageContainer])}>
        <Image
          source={Images.login}
          style={StyleSheet.flatten([S.loginImage])}
        />
      </View>
    );
  };

  const _renderText = () => {
    return (
      <View>
        <View style={StyleSheet.flatten([S.textContainer])}>
          <Text
            style={StyleSheet.flatten([S.header, { fontFamily: Fonts.bold }])}
          >
            {LOGIN_CONFIG.greet}
          </Text>
          <Text
            style={StyleSheet.flatten([
              S.header,
              { color: theme.colors.primary, fontFamily: Fonts.bold },
            ])}
          >
            {LOGIN_CONFIG.appName}
          </Text>
        </View>
        <View style={StyleSheet.flatten([S.descriptionContainer])}>
          <Text
            style={StyleSheet.flatten([
              S.description,
              { fontFamily: Fonts.regular },
            ])}
          >
            {LOGIN_CONFIG.description}
          </Text>
        </View>
      </View>
    );
  };

  const _renderLoginButton = () => {
    return (
      <ElevatedView
        style={StyleSheet.flatten([S.buttonContainer])}
        elevation={2}
      >
        <TouchableOpacity
          style={StyleSheet.flatten([
            S.button,
            {
              backgroundColor: theme.colors.primary,
            },
          ])}
          activeOpacity={0.8}
          onPress={navigateToOtp}
        >
          <Text
            style={StyleSheet.flatten([
              S.buttonTitle,
              { color: theme.colors.white, fontFamily: Fonts.semibold },
            ])}
          >
            {LOGIN_CONFIG.buttonTitle}
          </Text>
        </TouchableOpacity>
      </ElevatedView>
    );
  };

  const _renderGoogleLoginButton = () => {
    return (
      <ElevatedView
        style={StyleSheet.flatten([S.buttonContainer])}
        elevation={2}
      >
        <TouchableOpacity
          style={StyleSheet.flatten([
            S.button,
            {
              backgroundColor: theme.colors.secondaryBackground,
              borderWidth: 0.2,
            },
          ])}
          activeOpacity={0.8}
        >
          <Image
            source={Images.google}
            style={StyleSheet.flatten([S.googleImage])}
          />
          <Text
            style={StyleSheet.flatten([
              S.buttonTitle,
              {
                color: theme.colors.black,
                fontFamily: Fonts.semibold,
                opacity: 0.5,
              },
            ])}
          >
            {LOGIN_CONFIG.googleButtonTitle}
          </Text>
        </TouchableOpacity>
      </ElevatedView>
    );
  };

  const _renderForm = () => {
    return (
      <View style={StyleSheet.flatten([S.formContainer])}>
        <View
          style={StyleSheet.flatten([
            S.labelContainer,
            { backgroundColor: theme.colors.background },
          ])}
        >
          <Text
            style={StyleSheet.flatten([
              S.labelText,
              { fontFamily: Fonts.regular, color: theme.colors.black },
            ])}
          >
            {LOGIN_CONFIG.label}
          </Text>
        </View>

        <TextInput
          style={StyleSheet.flatten([
            S.input,
            {
              borderColor: theme.colors.background,
              borderWidth: 1,
              backgroundColor: theme.colors.secondaryBackground,
            },
          ])}
        />

        {_renderLoginButton()}
        <Text
          style={StyleSheet.flatten([
            S.separator,
            {
              color: theme.colors.black,
              fontFamily: Fonts.bold,
            },
          ])}
        >
          {LOGIN_CONFIG.or}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      style={StyleSheet.flatten([S.container])}
      showsVerticalScrollIndicator={false}
    >
      {_renderLandingImage()}
      {_renderText()}
      {_renderForm()}
      {_renderGoogleLoginButton()}
    </ScrollView>
  );
};
