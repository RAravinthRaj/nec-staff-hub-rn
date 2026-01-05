/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer } from "@/components";
import { Body, Header } from "./components";

export const LeaveApprovalDetailScreen = ({ navigation, route }: any) => {
  const { leave } = route.params;

  const _goBack = () => {
    return navigation.goBack();
  };

  return (
    <>
      <Header goBack={_goBack} />
      <PageContainer isLightStatusBar={true}>
        <Body leave={leave} />
      </PageContainer>
    </>
  );
};
