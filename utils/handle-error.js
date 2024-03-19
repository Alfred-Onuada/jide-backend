import express from "express";
const {Response} = express;

/**
 * @param {*} error 
 * @param {Response} res 
 */
export function handle_error(error, res) {
  // process error from mongodb schema validation
  if (error.name === "ValidationError") {
    // get all validation errors
    const validationErrors = Object.values(error.errors).map(
      (err) => err.message
    );

    // send error to client
    res.status(400).json({
      message: "Bad Request",
      errors: validationErrors,
    });
    return;
  }

  // process error from mongodb duplicate key
  if (error.code === 11000) {
    let duplicateField = Object.keys(error.keyPattern)[0];
    res.status(400).json({ message: `${duplicateField} already exists` });
    return;
  }

  // process error from mongodb
  console.log(error);
  res.status(500).json({ message: "Internal Server Error" });
  return;
}