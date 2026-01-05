/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer } from "@/components";
import { Body, Header, LeaveDetails } from "./components";
import { LEAVE_APPROVAL_CONFIG } from "./config";
import { ScrollView } from "react-native";

export const LeaveApprovalScreen = ({ navigation }: any) => {
  const _navigateToLeaveDetails = (leave: any) => {
    return navigation.navigate("LeaveDetails", {
      leave,
      fromHod: true,
    });
  };
  const _navigateToNotification = () => {
    return navigation.navigate("Notification");
  };

  return (
    <>
      <Header navigateToNotification={_navigateToNotification} />
      <PageContainer isLightStatusBar={true}>
        <ScrollView>
          <Body />
          <LeaveDetails
            leaveDetails={LEAVE_APPROVAL_CONFIG.leaveDetails}
            navigateToLeaveDetails={_navigateToLeaveDetails}
          />
        </ScrollView>
      </PageContainer>
    </>
  );
};
