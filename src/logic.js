export const amountFormatter = (amount) => {
  if (amount === 0) {
    return "";
  } else {
    return `$${amount}`;
  }
};
