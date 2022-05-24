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

export const changeGender = (value1, value2, value3) => {
  let changedString = "";
  if (value1 === true) {
    changedString += "male,";
  }
  if (value2 === true) {
    changedString += "female,";
  }
  if (value3 === true) {
    changedString += "children";
  }
  return changedString;
};

export const changeTop = (value1, value2, value3) => {
  let changedString = "";
  if (value1 === true) {
    changedString += "t-shirt,";
  }

  if (value2 === true) {
    changedString += "hoodie,";
  }

  if (value3 === true) {
    changedString += "jacket";
  }
  return changedString;
};
export const changeBottom = (value1, value2, value3) => {
  let changedString = "";
  if (value1 === true) {
    changedString += "jeans,";
  }

  if (value2 === true) {
    changedString += "short,";
  }

  if (value3 === true) {
    changedString += "trouser";
  }
  return changedString;
};
