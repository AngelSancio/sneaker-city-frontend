import * as dotenv from "dotenv";

// NOTE: Ensures variable is always set.
const result = dotenv.config();
console.log(result)

if (result.error) {
    throw result.error
}

// assert(process.env.REACT_APP_API_BASE_URL);

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api/v1";
