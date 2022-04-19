import { API } from "aws-amplify";
import { ref } from "vue";

export const useAccountRequest = () => {
  const AISAuthRequestData = ref();

  const makeAISAccountRequest = async (id, user) => {
    await API.post("awsblogapi", "/v1/account-auth-requests", {
      body: {
        institutionId: id,
        callbackURL: `${window.origin}/callback/`,
        userId: user.value.attributes.sub,
      },
    }).then((res) => {
      AISAuthRequestData.value = res.data;
    });
  };

  return {
    makeAISAccountRequest,
    AISAuthRequestData,
  };
};
