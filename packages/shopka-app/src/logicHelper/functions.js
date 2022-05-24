export const checkType = (value) => {
  switch (value) {
    case 0:
      return "hot";
    case 3:
      return "male";
    case 4:
      return "female";
    case 5:
      return "children";
    case 7:
      return "t-shirt";
    case 8:
      return "hoodie";
    case 9:
      return "jacket";
    case 11:
      return "jeans";
    case 12:
      return "short";
    case 13:
      return "trousers";
  }
};

export const configNumber = (value) => {
  if (value < 0) {
    return;
  } else {
    return value;
  }
};

const validationNumber = (value) => {
  let newValue = "";
  if (value.length > 0) {
    newValue = value.replace(/[^0-9]/g, "");
  }
  return newValue;
};

export const expiryDate = (value) => {
  let confirmNumber = validationNumber(value);
  let newValue = "";

  if (confirmNumber.length > 4) {
    confirmNumber = confirmNumber.slice(0, 3);
  }

  if (confirmNumber.length > 0) {
    newValue = confirmNumber.substring(0, 2);
    if (confirmNumber.length > 2) {
      newValue += "/" + confirmNumber.substring(2, 4);
    }
  } else {
    newValue = confirmNumber;
  }
  return newValue;
};

export const cardNumber = (value) => {
  const numeralString = value.replace(/\s/g, "");
  let confirmNumber = validationNumber(numeralString);
  let newValue = "";

  if (confirmNumber.length > 16) {
    confirmNumber = confirmNumber.slice(0, 15);
  }

  if (confirmNumber.length > 0) {
    newValue = confirmNumber.substring(0, 4);
    if (confirmNumber.length > 4) {
      newValue += " " + confirmNumber.substring(4, 8);
    }
    if (confirmNumber.length > 8) {
      newValue += " " + confirmNumber.substring(8, 12);
    }
    if (confirmNumber.length > 12) {
      newValue += " " + confirmNumber.substring(12, 16);
    }
  } else {
    newValue = confirmNumber;
  }
  return newValue;
};

export const CVV = (value) => {
  let confirmNumber = validationNumber(value);
  let newValue = "";

  if (confirmNumber.length > 3) {
    confirmNumber = confirmNumber.slice(0, 3);
  }

  if (confirmNumber.length > 0) {
    newValue = confirmNumber.substring(0, 3);
  } else {
    newValue = confirmNumber;
  }
  return newValue;
};

export const checkValue = (value) => {
  switch (value) {
    case "order received":
      return 25;
    case "shipping":
      return 50;
    case "delivered":
      return 75;
    case "taken":
      return 100;
    default:
      return 0;
  }
};

export const writerDescription = (description) => {
  if (description.length > 85) {
    return description.slice(0, 85) + "...";
  } else {
    return description;
  }
};
