/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer } from "@/components";
import { Body, Header } from "./components";
import { LEAVE_REQUEST_CONFIG } from "./config";

export const LeaveRequestScreen = ({ navigation }: any) => {
  const _goBack = () => {
    return navigation.goBack();
  };

  return (
    <PageContainer isLightStatusBar={true}>
      <Header goBack={_goBack} />
      <Body categories={LEAVE_REQUEST_CONFIG.categories} />
    </PageContainer>
  );
};
