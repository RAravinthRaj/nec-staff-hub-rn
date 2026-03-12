/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Loader, PageContainer } from "@/components";
import { Body, CustomModal, Header } from "./components";
import { LEAVE_REQUEST_CONFIG } from "./config";
import { useLeaveCategoriesStore, useLeaveRequestStore } from "./stores";
import { showToast } from "@/utils";
import { useEffect, useState } from "react";
import { useLeaveRequestsStore } from "../Leaves/stores";

export const LeaveRequestScreen = ({ navigation }: any) => {
  const { requestLeave, requestLoading, requestError, resetRequestLeave } =
    useLeaveRequestStore();
  const {
    categories,
    categoriesLoading,
    categoriesError,
    fetchLeaveCategories,
  } = useLeaveCategoriesStore();
  const { fetchLeaveRequests } = useLeaveRequestsStore();

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState<string | undefined>();
  const [pendingPayload, setPendingPayload] = useState<{
    leaveType: "FULL_DAY" | "HALF_DAY";
    categoryId: number;
    startDate: string;
    endDate: string;
    reason: string;
    documents?: string[];
  } | null>(null);

  useEffect(() => {
    if (requestError && requestError.length > 0) {
      showToast(requestError, "error");
      resetRequestLeave();
    }
  }, [requestError, resetRequestLeave]);

  useEffect(() => {
    fetchLeaveCategories();
  }, [fetchLeaveCategories]);

  useEffect(() => {
    if (categoriesError && categoriesError.length > 0) {
      showToast(categoriesError, "error");
    }
  }, [categoriesError]);

  const _goBack = () => {
    return navigation.goBack();
  };

  const _handleSubmit = async (payload: {
    leaveType: "FULL_DAY" | "HALF_DAY";
    categoryId: number;
    startDate: string;
    endDate: string;
    reason: string;
    documents?: string[];
  }) => {
    try {
      const res = await requestLeave(
        payload.leaveType,
        payload.categoryId,
        payload.startDate,
        payload.endDate,
        payload.reason,
        payload.documents,
      );

      const data = res?.payload;
      if (data?.can_submit === false) {
        setConfirmMessage(
          data.warning || "Insufficient leave balance. Submit anyway?"
        );
        setPendingPayload(payload);
        setConfirmVisible(true);
        return;
      }

      if (data?.warning) {
        showToast(data.warning, "info");
      }

      await fetchLeaveRequests();
      showToast("Leave request submitted successfully.", "success");
      navigation.goBack();
    } catch (err: any) {
      showToast(err?.message || "Failed to submit leave request.", "error");
    }
  };

  const _confirmSubmit = async () => {
    if (!pendingPayload) return;

    try {
      const res = await requestLeave(
        pendingPayload.leaveType,
        pendingPayload.categoryId,
        pendingPayload.startDate,
        pendingPayload.endDate,
        pendingPayload.reason,
        pendingPayload.documents,
        true,
      );

      const data = res?.payload;
      if (data?.warning) {
        showToast(data.warning, "info");
      }

      await fetchLeaveRequests();
      showToast("Leave request submitted successfully.", "success");
      navigation.goBack();
    } catch (err: any) {
      showToast(err?.message || "Failed to submit leave request.", "error");
    } finally {
      setPendingPayload(null);
      setConfirmMessage(undefined);
    }
  };

  const _renderLeaveRequest = () => {
    if (categoriesLoading) {
      return <Loader />;
    }

    return (
      <Body
        categories={
          categories.length > 0
            ? categories.map((c) => ({
                label: `${c.name} (${c.remaining_days})`,
                value: String(c.id),
              }))
            : LEAVE_REQUEST_CONFIG.categories
        }
        onSubmit={_handleSubmit}
        submitLoading={requestLoading}
      />
    );
  };

  return (
    <>
      <Header goBack={_goBack} />
      <PageContainer isLightStatusBar={true}>
        {_renderLeaveRequest()}
      </PageContainer>

      {requestLoading && <Loader useModalLoader />}

      {confirmVisible && (
        <CustomModal
          visible={confirmVisible}
          setVisible={setConfirmVisible}
          onConfirm={_confirmSubmit}
          message={confirmMessage}
        />
      )}
    </>
  );
};
