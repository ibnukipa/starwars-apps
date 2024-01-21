const removeValue = <T>(array: Array<T>, value: T) => {
  const newArray = [...array];
  const index = newArray.indexOf(value);
  if (index > -1) {
    newArray.splice(index, 1);
  }

  return newArray;
};

export default removeValue;
