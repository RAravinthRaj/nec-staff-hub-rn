/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer } from "@/components";
import { Body, Header, LeaveDetails } from "./components";
import { ScrollView, View } from "react-native";
import { LEAVE_INTIMATION_CONFIG } from "./config";

export const LeaveIntimationScreen = ({ navigation }: any) => {
  const _navigateToLeaveDetails = (leave: any) => {
    return navigation.navigate("LeaveDetails", {
      leave,
      fromHod: true,
    });
  };

  return (
    <>
      <Header />
      <PageContainer isLightStatusBar={true}>
        <Body />
        <ScrollView showsVerticalScrollIndicator={false}>
          <LeaveDetails
            leaveDetails={LEAVE_INTIMATION_CONFIG.leaveDetails}
            navigateToLeaveDetails={_navigateToLeaveDetails}
          />
        </ScrollView>
      </PageContainer>
    </>
  );
};
