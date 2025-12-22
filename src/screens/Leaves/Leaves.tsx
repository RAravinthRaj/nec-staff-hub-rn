/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer } from "@/components";
import { Body, Header, LeaveDetails } from "./components";
import { ScrollView } from "react-native";
import { LEAVE_CONFIG } from "./config";

export const LeaveScreen = ({ navigation }: any) => {
  const _navigateToNewLeave = () => {
    return navigation.navigate("LeaveRequest");
  };

  const _navigateToLeaveDetails = (leave: any) => {
    return navigation.navigate("LeaveDetails", {
      leave,
    });
  };

  return (
    <PageContainer isLightStatusBar={true}>
      <Header navigateToNewLeave={_navigateToNewLeave} />
      <Body />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LeaveDetails
          leaveDetails={LEAVE_CONFIG.leaveDetails}
          navigateToLeaveDetails={_navigateToLeaveDetails}
        />
      </ScrollView>
    </PageContainer>
  );
};
