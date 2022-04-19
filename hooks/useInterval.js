import { ref, onBeforeUnmount } from "vue";
import { API } from "aws-amplify";

const useInterval = () => {
  const interval = ref(null);
  const startTime = ref(null);
  const consentData = ref(null);
  onBeforeUnmount(() => {
    terminateInterval();
  });
  const startInterval = ({ authRequestData }) => {
    startTime.value = new Date().getTime();
    if (authRequestData.value) {
      interval.value = setInterval(async () => {
        if (new Date().getTime() - startTime.value > 300000) {
          // clear interval after 3 minutes
          terminateInterval();
          return;
        }
        const { id } = authRequestData.value;
        const result = await API.get("awsblogapi", `/v1/consents/${id}`);

        if (result.data && result.data?.status === "AUTHORIZED") {
          terminateInterval();
          // 'Your account has now been connected.
          setTimeout(async () => {
            terminateInterval();
            consentData.value = result.data;
          }, 3000);
        }
      }, 2000);
    }
  };

  const terminateInterval = () => {
    startTime.value = null;
    clearInterval(interval.value);
  };
  return {
    interval,
    startTime,
    consentData,
    startInterval,
    terminateInterval,
  };
};

export default useInterval;
