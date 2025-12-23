/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { Fonts } from "@/assets";
import Toast from "react-native-toast-message";

export const showToast = (message: string, type: string) => {
  Toast.show({
    type,
    text1: message,
    position: "top",
    visibilityTime: 1500,
    topOffset: 50,

    text1Style: {
      fontSize: 16,
      fontWeight: "600",
      fontFamily: Fonts.semibold,
    },

    text2Style: {
      fontSize: 16,
      fontFamily: Fonts.semibold,
      color: "#6b7280",
    },

    props: {
      style: {
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
    },
  });
};
