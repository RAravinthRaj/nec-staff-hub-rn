/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Loader, PageContainer } from "@/components";
import { Body, Header, Schedules } from "./components";
import { useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useScheduleStore } from "./stores";
import { showToast } from "@/utils";
import { useNotificationStore } from "../Notification/stores";

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
  const { unreadCount, fetchNotifications } = useNotificationStore();

  const _fetchSchedules = useCallback(() => {
    const formattedDay = dayjs(date).format("ddd").toUpperCase();

    resetSchedules();
    fetchSchedules(formattedDay);
  }, [date, fetchSchedules, resetSchedules]);

  useFocusEffect(
    useCallback(() => {
      _fetchSchedules();
      fetchNotifications("all");
    }, [_fetchSchedules, fetchNotifications]),
  );

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
    _fetchSchedules();
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
      <Header
        navigateToNotification={_navigateToNotification}
        showBadge={unreadCount > 0}
      />
      <Body setDate={setDate} />

      <PageContainer isLightStatusBar={true}>
        {_renderSchedules()}
      </PageContainer>
    </>
  );
};
