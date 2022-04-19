import { ref, onBeforeUnmount } from "vue";
import { API } from "aws-amplify";
import { useRouter } from "vue-router";

const useInterval = ({ demoType }) => {
  const interval = ref(null);
  const startTime = ref(null);
  const router = useRouter();

  onBeforeUnmount(() => {
    terminateInterval();
  });
  const startInterval = ({ authRequestData, user }) => {
    startTime.value = new Date().getTime();
    if (authRequestData.value) {
      interval.value = setInterval(async () => {
        if (new Date().getTime() - startTime.value > 300000) {
          // clear interval after 5 minutes
          clearInterval(interval.value);
          return;
        }
        const { id } = authRequestData.value;
        const result = await API.get("awsblogapi", `/v1/consents/${id}`);

        if (result.data && result.data?.status === "AUTHORIZED") {
          clearInterval(interval.value);
          // 'Your account has now been connected.
          setTimeout(async () => {
            clearInterval(interval.value);
            const { consentToken } = result.data;
            if (demoType === "ais") {
              await API.post("awsblogapi", `/v1/accounts`, {
                body: {
                  userId: user.value.attributes.sub,
                  institutionId: id,
                  consentToken,
                },
              }).then(() => {
                router.push("/accounts");
              });
            }
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
    startInterval,
    terminateInterval,
  };
};

export default useInterval;
