export const simulatePayment = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    status: "success",
    transactionId: "txn_" + Date.now()
  };
};