/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

// import {
//   View,
//   ScrollView,
//   Image,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
// } from "react-native";
// import { Images, Fonts } from "@/assets";
// import { styles as S } from "./styles";
// import { LOGIN_CONFIG } from "../../config";
// import { useTheme } from "@rneui/themed";
// import ElevatedView from "react-native-elevated-view";
// import { useState } from "react";

// export interface IBody {
//   navigateToOtp: () => void;
//   setEmail: React.Dispatch<React.SetStateAction<string>>;
// }

// export const Body = ({ navigateToOtp, setEmail }: IBody) => {
//   const { theme } = useTheme();

//   const _renderLandingImage = () => {
//     return (
//       <View style={StyleSheet.flatten([S.imageContainer])}>
//         <Image
//           source={Images.login}
//           style={StyleSheet.flatten([S.loginImage])}
//         />
//       </View>
//     );
//   };

//   const _renderText = () => {
//     return (
//       <View>
//         <View style={StyleSheet.flatten([S.textContainer])}>
//           <Text
//             style={StyleSheet.flatten([S.header, { fontFamily: Fonts.bold }])}
//           >
//             {LOGIN_CONFIG.greet}
//           </Text>
//           <Text
//             style={StyleSheet.flatten([
//               S.header,
//               { color: theme.colors.primary, fontFamily: Fonts.bold },
//             ])}
//           >
//             {LOGIN_CONFIG.appName}
//           </Text>
//         </View>
//         <View style={StyleSheet.flatten([S.descriptionContainer])}>
//           <Text
//             style={StyleSheet.flatten([
//               S.description,
//               { fontFamily: Fonts.regular },
//             ])}
//           >
//             {LOGIN_CONFIG.description}
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   const _renderLoginButton = () => {
//     return (
//       <ElevatedView
//         style={StyleSheet.flatten([S.buttonContainer])}
//         elevation={2}
//       >
//         <TouchableOpacity
//           style={StyleSheet.flatten([
//             S.button,
//             {
//               backgroundColor: theme.colors.primary,
//             },
//           ])}
//           activeOpacity={0.8}
//           onPress={navigateToOtp}
//         >
//           <Text
//             style={StyleSheet.flatten([
//               S.buttonTitle,
//               { color: theme.colors.white, fontFamily: Fonts.semibold },
//             ])}
//           >
//             {LOGIN_CONFIG.buttonTitle}
//           </Text>
//         </TouchableOpacity>
//       </ElevatedView>
//     );
//   };

//   const _renderGoogleLoginButton = () => {
//     return (
//       <ElevatedView
//         style={StyleSheet.flatten([S.buttonContainer])}
//         elevation={2}
//       >
//         <TouchableOpacity
//           style={StyleSheet.flatten([
//             S.button,
//             {
//               backgroundColor: theme.colors.secondaryBackground,
//               borderWidth: 0.2,
//             },
//           ])}
//           activeOpacity={0.8}
//         >
//           <Image
//             source={Images.google}
//             style={StyleSheet.flatten([S.googleImage])}
//           />
//           <Text
//             style={StyleSheet.flatten([
//               S.buttonTitle,
//               {
//                 color: theme.colors.black,
//                 fontFamily: Fonts.semibold,
//                 opacity: 0.5,
//               },
//             ])}
//           >
//             {LOGIN_CONFIG.googleButtonTitle}
//           </Text>
//         </TouchableOpacity>
//       </ElevatedView>
//     );
//   };

//   const _renderForm = () => {
//     return (
//       <View style={StyleSheet.flatten([S.formContainer])}>
//         <View
//           style={StyleSheet.flatten([
//             S.labelContainer,
//             { backgroundColor: theme.colors.background },
//           ])}
//         >
//           <Text
//             style={StyleSheet.flatten([
//               S.labelText,
//               { fontFamily: Fonts.regular, color: theme.colors.black },
//             ])}
//           >
//             {LOGIN_CONFIG.label}
//           </Text>
//         </View>

//         <TextInput
//           style={StyleSheet.flatten([
//             S.input,
//             {
//               borderColor: theme.colors.background,
//               borderWidth: 1,
//               backgroundColor: theme.colors.secondaryBackground,
//             },
//           ])}
//           returnKeyType="send"
//           onChangeText={(text) => setEmail(text)}
//           onSubmitEditing={navigateToOtp}
//         />

//         {_renderLoginButton()}
//         <Text
//           style={StyleSheet.flatten([
//             S.separator,
//             {
//               color: theme.colors.black,
//               fontFamily: Fonts.bold,
//             },
//           ])}
//         >
//           {LOGIN_CONFIG.or}
//         </Text>
//       </View>
//     );
//   };

//   return (
//     <ScrollView
//       style={StyleSheet.flatten([S.container])}
//       showsVerticalScrollIndicator={false}
//     >
//       {_renderLandingImage()}
//       {_renderText()}
//       {_renderForm()}
//       {_renderGoogleLoginButton()}
//     </ScrollView>
//   );
// };

// import {
//   View,
//   ScrollView,
//   Image,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ActivityIndicator,
// } from "react-native";
// import { Images, Fonts } from "@/assets";
// import { styles as S } from "./styles";
// import { LOGIN_CONFIG } from "../../config";
// import { useTheme } from "@rneui/themed";
// import ElevatedView from "react-native-elevated-view";
// import { useEffect } from "react";
// import { config } from "@/config";

// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";

// WebBrowser.maybeCompleteAuthSession();

// export interface IBody {
//   navigateToOtp: () => void;
//   handleGoogleLogin: (idToken: string) => void;
//   setEmail: React.Dispatch<React.SetStateAction<string>>;
//   loading: boolean;
// }

// export const Body = ({
//   navigateToOtp,
//   handleGoogleLogin,
//   setEmail,
//   loading,
// }: IBody) => {
//   const { theme } = useTheme();

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId: config.googleClientId,
//     scopes: ["openid", "profile", "email"],
//   });

//   useEffect(() => {
//     if (response?.type === "success") {
//       const idToken = response.authentication?.idToken;

//       if (idToken) {
//         handleGoogleLogin(idToken);
//       }
//     }
//   }, [response]);

//   const renderLoginButton = () => (
//     <ElevatedView style={S.buttonContainer} elevation={2}>
//       <TouchableOpacity
//         style={[S.button, { backgroundColor: theme.colors.primary }]}
//         activeOpacity={0.8}
//         disabled={loading}
//         onPress={navigateToOtp}
//       >
//         {loading ? (
//           <ActivityIndicator color="white" />
//         ) : (
//           <Text
//             style={[
//               S.buttonTitle,
//               { color: theme.colors.white, fontFamily: Fonts.semibold },
//             ]}
//           >
//             {LOGIN_CONFIG.buttonTitle}
//           </Text>
//         )}
//       </TouchableOpacity>
//     </ElevatedView>
//   );

//   const renderGoogleLoginButton = () => (
//     <ElevatedView style={S.buttonContainer} elevation={2}>
//       <TouchableOpacity
//         style={[
//           S.button,
//           {
//             backgroundColor: theme.colors.secondaryBackground,
//             borderWidth: 0.2,
//           },
//         ]}
//         activeOpacity={0.8}
//         disabled={!request || loading}
//         onPress={() => promptAsync()}
//       >
//         <Image source={Images.google} style={S.googleImage} />
//         <Text
//           style={[
//             S.buttonTitle,
//             {
//               color: theme.colors.black,
//               fontFamily: Fonts.semibold,
//             },
//           ]}
//         >
//           {LOGIN_CONFIG.googleButtonTitle}
//         </Text>
//       </TouchableOpacity>
//     </ElevatedView>
//   );

//   return (
//     <ScrollView
//       style={S.container}
//       showsVerticalScrollIndicator={false}
//       keyboardShouldPersistTaps="handled"
//     >
//       <View style={S.imageContainer}>
//         <Image source={Images.login} style={S.loginImage} />
//       </View>

//       <View>
//         <View style={S.textContainer}>
//           <Text style={[S.header, { fontFamily: Fonts.bold }]}>
//             {LOGIN_CONFIG.greet}
//           </Text>
//           <Text
//             style={[
//               S.header,
//               { color: theme.colors.primary, fontFamily: Fonts.bold },
//             ]}
//           >
//             {LOGIN_CONFIG.appName}
//           </Text>
//         </View>

//         <View style={S.descriptionContainer}>
//           <Text style={[S.description, { fontFamily: Fonts.regular }]}>
//             {LOGIN_CONFIG.description}
//           </Text>
//         </View>
//       </View>

//       <View style={S.formContainer}>
//         <View
//           style={[
//             S.labelContainer,
//             { backgroundColor: theme.colors.background },
//           ]}
//         >
//           <Text
//             style={[
//               S.labelText,
//               { fontFamily: Fonts.regular, color: theme.colors.black },
//             ]}
//           >
//             {LOGIN_CONFIG.label}
//           </Text>
//         </View>

//         <TextInput
//           style={[
//             S.input,
//             {
//               borderColor: theme.colors.background,
//               borderWidth: 1,
//               backgroundColor: theme.colors.secondaryBackground,
//             },
//           ]}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           returnKeyType="send"
//           onChangeText={setEmail}
//           onSubmitEditing={navigateToOtp}
//         />

//         {renderLoginButton()}

//         <Text
//           style={[
//             S.separator,
//             {
//               color: theme.colors.black,
//               fontFamily: Fonts.bold,
//             },
//           ]}
//         >
//           {LOGIN_CONFIG.or}
//         </Text>
//       </View>

//       {renderGoogleLoginButton()}
//     </ScrollView>
//   );
// };

import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Images, Fonts } from "@/assets";
import { styles as S } from "./styles";
import { LOGIN_CONFIG } from "../../config";
import { useTheme } from "@rneui/themed";
import ElevatedView from "react-native-elevated-view";
import { useEffect } from "react";
import { config } from "@/config";

import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

/* ✅ MOVE THIS OUTSIDE COMPONENT */
const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

export interface IBody {
  navigateToOtp: () => void;
  handleGoogleLogin: (idToken: string) => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

export const Body = ({
  navigateToOtp,
  handleGoogleLogin,
  setEmail,
  loading,
}: IBody) => {
  const { theme } = useTheme();

  /* ✅ Hook 1 */
  const redirectUri = AuthSession.makeRedirectUri();

  /* ✅ Hook 2 (must always be called in same order) */
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: config.googleClientId, // MUST be Web Client ID
      scopes: ["openid", "profile", "email"],
      responseType: "id_token",
      redirectUri,
    },
    discovery,
  );

  console.log(redirectUri);

  /* ✅ Hook 3 */
  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.params?.id_token;
      if (idToken) {
        handleGoogleLogin(idToken);
      }
    }
  }, [response]);

  const renderLoginButton = () => (
    <ElevatedView style={S.buttonContainer} elevation={2}>
      <TouchableOpacity
        style={[S.button, { backgroundColor: theme.colors.primary }]}
        activeOpacity={0.8}
        disabled={loading}
        onPress={navigateToOtp}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text
            style={[
              S.buttonTitle,
              { color: theme.colors.white, fontFamily: Fonts.semibold },
            ]}
          >
            {LOGIN_CONFIG.buttonTitle}
          </Text>
        )}
      </TouchableOpacity>
    </ElevatedView>
  );

  const renderGoogleLoginButton = () => (
    <ElevatedView style={S.buttonContainer} elevation={2}>
      <TouchableOpacity
        style={[
          S.button,
          {
            backgroundColor: theme.colors.secondaryBackground,
            borderWidth: 0.2,
          },
        ]}
        activeOpacity={0.8}
        disabled={!request || loading}
        onPress={() => promptAsync()}
      >
        <Image source={Images.google} style={S.googleImage} />
        <Text
          style={[
            S.buttonTitle,
            {
              color: theme.colors.black,
              fontFamily: Fonts.semibold,
            },
          ]}
        >
          {LOGIN_CONFIG.googleButtonTitle}
        </Text>
      </TouchableOpacity>
    </ElevatedView>
  );

  return (
    <ScrollView
      style={S.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={S.imageContainer}>
        <Image source={Images.login} style={S.loginImage} />
      </View>

      <View>
        <View style={S.textContainer}>
          <Text style={[S.header, { fontFamily: Fonts.bold }]}>
            {LOGIN_CONFIG.greet}
          </Text>
          <Text
            style={[
              S.header,
              { color: theme.colors.primary, fontFamily: Fonts.bold },
            ]}
          >
            {LOGIN_CONFIG.appName}
          </Text>
        </View>

        <View style={S.descriptionContainer}>
          <Text style={[S.description, { fontFamily: Fonts.regular }]}>
            {LOGIN_CONFIG.description}
          </Text>
        </View>
      </View>

      <View style={S.formContainer}>
        <View
          style={[
            S.labelContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text
            style={[
              S.labelText,
              { fontFamily: Fonts.regular, color: theme.colors.black },
            ]}
          >
            {LOGIN_CONFIG.label}
          </Text>
        </View>

        <TextInput
          style={[
            S.input,
            {
              borderColor: theme.colors.background,
              borderWidth: 1,
              backgroundColor: theme.colors.secondaryBackground,
            },
          ]}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="send"
          onChangeText={setEmail}
          onSubmitEditing={navigateToOtp}
        />

        {renderLoginButton()}

        <Text
          style={[
            S.separator,
            {
              color: theme.colors.black,
              fontFamily: Fonts.bold,
            },
          ]}
        >
          {LOGIN_CONFIG.or}
        </Text>
      </View>

      {renderGoogleLoginButton()}
    </ScrollView>
  );
};
