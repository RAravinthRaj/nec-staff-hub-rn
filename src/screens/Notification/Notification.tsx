/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer } from "@/components";
import { Body, Header, Chip } from "./components";
import { NOTIFICATION_CONFIG } from "./config";
import { ScrollView } from "react-native";

export const NotificationScreen = ({ navigation }: any) => {
  const _goBack = () => {
    return navigation.goBack();
  };

  return (
    <PageContainer isLightStatusBar={true}>
      <Header goBack={_goBack} />
      <Chip />
      <ScrollView>
        <Body notifications={NOTIFICATION_CONFIG.notifications} />
      </ScrollView>
    </PageContainer>
  );
};
