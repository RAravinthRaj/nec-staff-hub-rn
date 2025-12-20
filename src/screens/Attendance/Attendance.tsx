/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer } from "@/components";
import { Body, Header, StudentList } from "./components";
import { ScrollView } from "react-native";
import { ATTENDANCE_CONFIG } from "./config";

export const AttendanceScreen = ({ navigation }: any) => {
  const _navigateToBack = () => {
    return navigation.goBack();
  };

  const details = {
    totalStudents: 44,
    present: 0,
    absent: 44,
    onDuty: 0,
  };

  return (
    <PageContainer isLightStatusBar={true}>
      <Header goBack={_navigateToBack} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Body statsData={details} />
        <StudentList studentsData={ATTENDANCE_CONFIG.students} />
      </ScrollView>
    </PageContainer>
  );
};
