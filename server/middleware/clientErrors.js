const clientErrors = (err, req, res, next) => {
  console.log("Error: ", err.message);
  return res.status(err.status).json({ errorMessage: err.message });
};

export default clientErrors;
