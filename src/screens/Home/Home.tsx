/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer } from "@/components";
import { Body, Header, Schedules } from "./components";
import dayjs from "dayjs";
import { useState } from "react";
import { HOME_CONFIG } from "./config";
import { ScrollView } from "react-native";

export const HomeScreen = ({ navigation }: any) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [date, setDate] = useState(today);

  const _navigateToAttendance = () => {
    return navigation.navigate("Attendance");
  };

  const _navigateToNotification = () => {
    return navigation.navigate("Notification");
  };

  return (
    <>
      <Header navigateToNotification={_navigateToNotification} />
      <PageContainer isLightStatusBar={true}>
        <ScrollView>
          <Body setDate={setDate} />
          <Schedules
            date={date}
            data={HOME_CONFIG.data}
            navigateToAttendance={_navigateToAttendance}
          />
        </ScrollView>
      </PageContainer>
    </>
  );
};
