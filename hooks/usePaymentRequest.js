import { API } from "aws-amplify";
import { ref } from "vue";
import { useRandomPaymentIdempotencyId } from "./useRandomPaymentIdempotencyId";

export const usePaymentRequest = () => {
  const PaymentRequestData = ref();
  const { randomPaymentIdempotencyId } = useRandomPaymentIdempotencyId();
  const makePaymentRequest = async ({ id, user, paymentDetails }) => {
    await API.post("awsblogapi", "/v1/payment-auth-requests", {
      body: {
        institutionId: id,
        callbackURL: `${window.origin}/callback/?demoType=pis`,
        userId: user.value.attributes.sub,
        paymentRequest: {
          type: "DOMESTIC_PAYMENT",
          reference: paymentDetails.reference,
          contextType: "OTHER",
          amount: {
            amount: paymentDetails.amount,
            currency: "GBP",
          },
          payee: {
            name: paymentDetails.fullName,
            address: {
              country: "GB",
            },
            accountIdentifications: [
              {
                type: "SORT_CODE",
                identification: paymentDetails.sortCode,
              },
              {
                type: "ACCOUNT_NUMBER",
                identification: paymentDetails.accountNumber,
              },
            ],
          },
          paymentIdempotencyId: randomPaymentIdempotencyId(35),
        },
      },
    }).then((res) => {
      PaymentRequestData.value = res.data;
    });
  };

  return {
    makePaymentRequest,
    PaymentRequestData,
  };
};
