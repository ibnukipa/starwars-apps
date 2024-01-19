const suffixes = ['', 'k', 'm', 'b', 't'];
const getAbbreviateNumber = (value?: string | number) => {
  if (!value) {
    return undefined;
  }
  let newValue: string = String(value);
  if (Number(newValue) >= 1000) {
    const suffixNum = Math.floor(('' + value).length / 3);
    let shortValue: string | number = 0;
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum !== 0
          ? Number(value) / Math.pow(1000, suffixNum)
          : Number(value)
        ).toPrecision(precision),
      );
      const dotLessShortValue = (shortValue + '').replace(
        /[^a-zA-Z 0-9]+/g,
        '',
      );
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1);
    }
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
};

export default getAbbreviateNumber;
