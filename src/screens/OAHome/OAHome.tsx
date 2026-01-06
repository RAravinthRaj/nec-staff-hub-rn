/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer } from "@/components";
import { Body, Header, StudentList } from "./components";
import { ScrollView } from "react-native";
import { OA_HOME_CONFIG } from "./config";

export const OAHomeScreen = ({ navigation }: any) => {
  const _navigateToNotification = () => {
    return navigation.navigate("Notification");
  };

  return (
    <>
      <Header navigateToNotification={_navigateToNotification} />
      <PageContainer isLightStatusBar={true}>
        <ScrollView>
          <Body />
          <StudentList studentsData={OA_HOME_CONFIG.students} />
        </ScrollView>
      </PageContainer>
    </>
  );
};
