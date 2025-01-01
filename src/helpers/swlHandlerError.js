export const swlHandlerError = error => {
  const { data } = error.response;
  const errorsList = data.errors
    ? Object.values(data.errors).map(({ msg }) => ({ error: msg }))
    : [{ msg: data.msg }];

  return errorsList;
};
