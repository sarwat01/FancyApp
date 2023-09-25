const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 3) {
    return helpers.message("پێویستە پاسۆردەکەت  لە 3 ژمارە کەمترنەبێت");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message("پێویستە پاسۆردەکەت لەنوسین و ژمارە پێکبێت");
  }
  return value;
};

module.exports = {
  objectId,
  password,
};
