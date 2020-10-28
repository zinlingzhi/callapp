export const formatNumber = str => {
  if (!str) {
    return '';
  }
  if (str.includes('-')) {
    return str;
  }
  // const strArr = str.replace(/[^\d]/g, '').split('');
  const strArr = str.split('');
  const strWithDash = strArr.reduce((acc, cur, index) => {
    if (index === 1 || index === 4 || index === 7) {
      acc.push('-');
    }
    acc.push(cur);
    return acc;
  }, []);

  return strWithDash.join('');
};

const format = number => `0${number}`.slice(-2);
export const getDuration = time => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return `${format(mins)}:${format(secs)}`;
};
