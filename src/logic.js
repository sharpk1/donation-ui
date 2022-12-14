export const amountFormatter = (amount) => {
  if (amount === 0) {
    return "$0";
  } else {
    return `$${amount}`;
  }
};
