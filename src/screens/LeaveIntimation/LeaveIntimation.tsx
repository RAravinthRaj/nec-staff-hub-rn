/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Loader, NoDataFound, PageContainer } from "@/components";
import { Body, Header, LeaveDetails } from "./components";
import { ScrollView } from "react-native";
import { LEAVE_INTIMATION_CONFIG } from "./config";
import { useEffect, useState } from "react";
import { useLeaveIntimationStore } from "./stores";
import { showToast } from "@/utils";
import * as SecureStore from "expo-secure-store";

export const LeaveIntimationScreen = ({ navigation }: any) => {
  const [status, setStatus] = useState("All");
  const [isHod, setIsHod] = useState(false);

  const { leaveDetails, leaveLoading, leaveError, fetchLeaveIntimations } =
    useLeaveIntimationStore();

  useEffect(() => {
    const checkRole = async () => {
      const role = await SecureStore.getItemAsync("role");
      if (role?.toUpperCase() !== "HOD") {
        showToast("Access denied.", "error");
        navigation.goBack();
        return;
      }
      setIsHod(true);
    };
    checkRole();
  }, [navigation]);

  useEffect(() => {
    if (!isHod) return;
    const statusValue = status === "All" ? undefined : status.toUpperCase();
    fetchLeaveIntimations(statusValue);
  }, [status, isHod, fetchLeaveIntimations]);

  useEffect(() => {
    if (leaveError && leaveError.length > 0) {
      showToast(leaveError, "error");
    }
  }, [leaveError]);

  const _navigateToLeaveDetails = (leave: any) => {
    return navigation.navigate("LeaveDetails", {
      leave,
      fromHod: true,
    });
  };

  const _renderLeaves = () => {
    if (leaveLoading) {
      return <Loader />;
    }

    if (!leaveDetails || Object.keys(leaveDetails).length === 0) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NoDataFound
            title={LEAVE_INTIMATION_CONFIG.noDataTitle}
            buttonTitle={LEAVE_INTIMATION_CONFIG.retry}
            onPress={() => {
              const statusValue = status === "All" ? undefined : status.toUpperCase();
              fetchLeaveIntimations(statusValue);
            }}
          />
        </ScrollView>
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <LeaveDetails
          leaveDetails={leaveDetails}
          navigateToLeaveDetails={_navigateToLeaveDetails}
        />
      </ScrollView>
    );
  };

  return (
    <>
      <Header />
      <PageContainer isLightStatusBar={true}>
        <Body status={status} onStatusChange={setStatus} />
        {_renderLeaves()}
      </PageContainer>
    </>
  );
};
