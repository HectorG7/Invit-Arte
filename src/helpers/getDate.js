export const getDate = () => {
  const objDate = new Date();
  const day =
    objDate.getDate() <= 9 ? `0${objDate.getDate()}` : `${objDate.getDate()}`;
  const month =
    objDate.getMonth() + 1 <= 9
      ? `0${objDate.getMonth() + 1}`
      : `${objDate.getMonth() + 1}`;
  return `${objDate.getFullYear()}-${month}-${day}`;
};
