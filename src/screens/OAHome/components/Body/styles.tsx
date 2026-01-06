/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { Fonts } from "@/assets";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerContainer: {
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  categoryContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  typeText: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    lineHeight: 22,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
    marginTop: -12,
  },
  date: {
    width: ScreenWidth * 0.5,
  },
  headerText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 17,
    fontFamily: Fonts.semibold,
    lineHeight: 22,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "column",
  },
  detail: {
    fontSize: 25,
    letterSpacing: 0.4,
  },
  description: {
    fontSize: 13,
  },
  searchBarContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    margin: 5,
  },
  searchBarElevatedContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  input: {
    borderWidth: 0.5,
    width: ScreenWidth * 0.65,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 15,
    borderRadius: 12,
  },
  search: {
    borderRadius: "50%",
    padding: 5,
  },
  modalStyle: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    pointerEvents: "box-none",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1.5,
    marginHorizontal: 5,
    marginTop: 5,
    zIndex: 1,
  },
  titleItem: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 12,
  },
  button: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonTitle: {
    fontSize: 16,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomTextContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
  },
  bottomText: {
    fontSize: 25,
    fontFamily: Fonts.bold,
  },
  bottomSubText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  bottomButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
