/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Loader, PageContainer } from "@/components";
import { Body, Header, Schedules } from "./components";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useScheduleStore } from "./stores";
import { showToast } from "@/utils";

export const HomeScreen = ({ navigation }: any) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [date, setDate] = useState(today);

  const {
    schedules,
    fetchSchedules,
    scheduleError,
    scheduleLoading,
    resetSchedules,
  } = useScheduleStore();

  useEffect(() => {
    const formattedDay = dayjs(date).format("ddd").toUpperCase();

    resetSchedules();
    fetchSchedules(formattedDay);
  }, [date]);

  useEffect(() => {
    if (scheduleError && scheduleError.length > 0) {
      showToast(scheduleError, "error");
    }
  }, [scheduleError]);

  const _navigateToAttendance = (courseBatchId: number, periodId: number) => {
    const selectedDate = dayjs(date).format("DD.MM.YYYY");
    return navigation.navigate("Attendance", {
      course_batch_id: courseBatchId,
      period_id: periodId,
      date: selectedDate,
    });
  };

  const _navigateToNotification = () => {
    return navigation.navigate("Notification");
  };

  const _retryFetchSchedules = () => {
    const formattedDay = dayjs(date).format("ddd").toUpperCase();

    resetSchedules();
    fetchSchedules(formattedDay);
  };

  const _renderSchedules = () => {
    if (scheduleLoading) {
      return <Loader />;
    }

    if (schedules) {
      return (
        <ScrollView>
          <Schedules
            date={date}
            data={schedules}
            navigateToAttendance={_navigateToAttendance}
            retryFetchStudents={_retryFetchSchedules}
          />
        </ScrollView>
      );
    }

    return null;
  };

  return (
    <>
      <Header navigateToNotification={_navigateToNotification} />
      <Body setDate={setDate} />

      <PageContainer isLightStatusBar={true}>
        {_renderSchedules()}
      </PageContainer>
    </>
  );
};
