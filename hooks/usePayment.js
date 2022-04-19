import { API } from "aws-amplify";
import { useRandomPaymentIdempotencyId } from "./useRandomPaymentIdempotencyId";
import { ref } from "vue";

export const usePayment = () => {
  const { randomPaymentIdempotencyId } = useRandomPaymentIdempotencyId();
  const paymentDetail = ref();
  const makePayment = async ({ consent, paymentDetails }) => {
    await API.post("awsblogapi", "/v1/payments", {
      body: {
        consent,
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
      paymentDetail.value = res.data;
    });
  };

  return {
    makePayment,
    paymentDetail,
  };
};
