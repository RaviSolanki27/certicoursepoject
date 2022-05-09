const responseData = ({ res, status, message, result }) => {
  let resultObj = {
    status: status,
    message,
    data: result,
  };
  return res.status(status).send(resultObj);
};

module.exports = responseData;
