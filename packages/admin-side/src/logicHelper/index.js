export const reformatTime = (time) => {
  const timeArray = time.split(" ");
  return `${timeArray[4]}`;
};

export const configNumber = (value) => {
  if (value < 0) {
    return;
  } else {
    return value;
  }
};

export const writerDescription = (description) => {
    if (description.length > 85) {
      return description.slice(0, 85) + "...";
    } else {
      return description;
    }
  };