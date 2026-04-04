/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import {
  HomeScreen,
  LeaveScreen,
  LeaveApprovalScreen,
  ProfileScreen,
  OAHomeScreen,
  OAFilterScreen,
  LeaveIntimationScreen,
} from "@/screens";

export const TAB_CONFIG = {
  STAFF: [
    {
      name: "Home",
      component: HomeScreen,
      icon: {
        focused: { name: "home", type: "entypo" },
        unfocused: { name: "home", type: "antdesign" },
      },
    },
    {
      name: "Leaves",
      component: LeaveScreen,
      icon: {
        focused: { name: "text-document-inverted", type: "entypo" },
        unfocused: { name: "text-document", type: "entypo" },
      },
    },
    {
      name: "Profile",
      component: ProfileScreen,
      icon: {
        focused: { name: "person", type: "ionicons" },
        unfocused: { name: "person-outline", type: "ionicons" },
      },
    },
  ],

  HOD: [
    {
      name: "Home",
      component: HomeScreen,
      icon: {
        focused: { name: "home", type: "entypo" },
        unfocused: { name: "home", type: "antdesign" },
      },
    },
    {
      name: "Leaves",
      component: LeaveScreen,
      icon: {
        focused: { name: "text-document-inverted", type: "entypo" },
        unfocused: { name: "text-document", type: "entypo" },
      },
    },
    {
      name: "LeaveRequests",
      component: LeaveIntimationScreen,
      icon: {
        focused: { name: "clipboard", type: "entypo" },
        unfocused: { name: "clipboard", type: "feather" },
      },
    },
    {
      name: "Profile",
      component: ProfileScreen,
      icon: {
        focused: { name: "person", type: "ionicons" },
        unfocused: { name: "person-outline", type: "ionicons" },
      },
    },
  ],

  HR: [
    {
      name: "Home",
      component: LeaveApprovalScreen,
      icon: {
        focused: { name: "home", type: "entypo" },
        unfocused: { name: "home", type: "antdesign" },
      },
    },
    {
      name: "Profile",
      component: ProfileScreen,
      icon: {
        focused: { name: "person", type: "ionicons" },
        unfocused: { name: "person-outline", type: "ionicons" },
      },
    },
  ],

  OA: [
    {
      name: "OAHome",
      component: OAHomeScreen,
      icon: {
        focused: { name: "home", type: "entypo" },
        unfocused: { name: "home", type: "antdesign" },
      },
    },
    {
      name: "OAFilter",
      component: OAFilterScreen,
      icon: {
        focused: { name: "filter", type: "antdesign" },
        unfocused: { name: "filter-list", type: "material" },
      },
    },
    {
      name: "Profile",
      component: ProfileScreen,
      icon: {
        focused: { name: "person", type: "ionicons" },
        unfocused: { name: "person-outline", type: "ionicons" },
      },
    },
  ],
};
