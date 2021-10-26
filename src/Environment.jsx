import * as assert from 'assert';

// NOTE: Ensures variable is always set.
assert(process.env.REACT_APP_API_BASE_URL);

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api/v1";
