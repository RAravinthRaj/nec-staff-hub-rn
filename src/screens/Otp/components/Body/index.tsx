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
import { OTP_CONFIG } from "../../config";
import { useTheme } from "@rneui/themed";
import ElevatedView from "react-native-elevated-view";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export const Body = () => {
  const { theme } = useTheme();

  const _renderLandingImage = () => {
    return (
      <View style={StyleSheet.flatten([S.imageContainer])}>
        <Image source={Images.otp} style={StyleSheet.flatten([S.otpImage])} />
      </View>
    );
  };

  const _renderText = () => {
    return (
      <View style={StyleSheet.flatten([S.textContainer])}>
        <Text
          style={StyleSheet.flatten([S.header, { fontFamily: Fonts.bold }])}
        >
          {OTP_CONFIG.header}
        </Text>

        <View style={StyleSheet.flatten([S.descriptionContainer])}>
          <Text
            style={StyleSheet.flatten([
              S.description,
              { fontFamily: Fonts.regular },
            ])}
          >
            {OTP_CONFIG.description}
          </Text>
        </View>
      </View>
    );
  };

  const _renderOtp = () => {
    return (
      <SafeAreaProvider>
        <View style={StyleSheet.flatten([S.otpMainContainer])}>
          <OtpInput
            numberOfDigits={4}
            onTextChange={(text) => console.log(text)}
            theme={{
              containerStyle: StyleSheet.flatten([S.otpContainer]),
              pinCodeContainerStyle: StyleSheet.flatten([
                S.otpInput,
                {
                  backgroundColor: theme.colors.secondaryBackground,
                },
              ]),
              pinCodeTextStyle: StyleSheet.flatten([
                {
                  color: theme.colors.black,
                },
              ]),
              focusStickStyle: StyleSheet.flatten([
                {
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                },
              ]),
              focusedPinCodeContainerStyle: StyleSheet.flatten([
                {
                  borderWidth: 2,
                  borderColor: theme.colors.border,
                },
              ]),
            }}
          />
        </View>
      </SafeAreaProvider>
    );
  };

  const _renderVerifyButton = () => {
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
        >
          <Text
            style={StyleSheet.flatten([
              S.buttonTitle,
              { color: theme.colors.white, fontFamily: Fonts.semibold },
            ])}
          >
            {OTP_CONFIG.buttonTitle}
          </Text>
        </TouchableOpacity>
      </ElevatedView>
    );
  };

  const _renderResendButton = () => {
    return (
      <View style={StyleSheet.flatten([S.resendContainer])}>
        <Text
          style={StyleSheet.flatten([
            S.resend,
            { color: theme.colors.black, fontFamily: Fonts.regular },
          ])}
        >
          {OTP_CONFIG.otpResend}
        </Text>
        <Text
          style={StyleSheet.flatten([
            S.resend,
            { color: theme.colors.primary, fontFamily: Fonts.semibold },
          ])}
        >
          {OTP_CONFIG.resend}
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
      {_renderOtp()}
      {_renderVerifyButton()}
      {_renderResendButton()}
    </ScrollView>
  );
};
