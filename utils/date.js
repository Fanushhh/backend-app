const getCookieExpireDate = ({
  days,
  weeks,
  months,
}) => {
  const currentDate = new Date();
  days && currentDate.setDate(currentDate.getDate() + days);
  weeks && currentDate.setDate(currentDate.getDate() + weeks * 7);
  months && currentDate.setMonth(currentDate.getMonth() + months);
  return currentDate;
};

module.exports = { getCookieExpireDate };
