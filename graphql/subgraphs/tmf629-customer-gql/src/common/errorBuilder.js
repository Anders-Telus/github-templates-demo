const errorType = {
  400: (message, timestamp) => {
    return {
      status: 400,
      code: "INV-INPUT",
      message: `${message}`,
      reason: "Invalid Input",
      timestamp: timestamp
    };
  },
  401: (message, timestamp) => {
    return {
      status: 401,
      code: "NOT-AUTH",
      message: `${message}`,
      reason: "Not Authorized",
      timestamp: timestamp
    };
  },
  404: (message, timestamp) => {
    return {
      status: 404,
      code: "NOT-FOUND",
      message: `${message}`,
      reason: "Not Found",
      timestamp: timestamp
    };
  },
  500: (message, timestamp) => {
    return {
      status: 500,
      code: "INT-ERR",
      message: `${message}`,
      reason: "Internal Server Error",
      timestamp: timestamp
    };
  },
};

function getErrorMessage(error) {
  let errorMessage = "unknown error"

  if (error.body) {
    if (error.body.message) {
      errorMessage = error.body.message;
    } else if (error.body.status && error.body.status.statusTxt) {
      errorMessage = error.body.status.statusTxt
    }
  }

  return errorMessage;
}

function getErrorStatus(error) {
  let errorStatus = 500;
  let responseBodyStatus = "500";
  if (error.body && error.body.status) {
    const body = error.body;

    if (body.status) {
      responseBodyStatus = body.status.toString();
      if (body.status.statusCd) {
        responseBodyStatus = body.status.statusCd.toString();
      }

    }
  } else if (error.status) {
    responseBodyStatus = error.status.toString();
  }

  if (responseBodyStatus === "404" || responseBodyStatus === "400") {
    errorStatus = 400
  } else if (responseBodyStatus === "401") {
    errorStatus = 401
  } else {
    errorStatus = 500
  }

  return errorStatus;
}

const errorBuilder = (error) => {
  let timestamp = new Date().toISOString();
  if (
    error &&
    error.extensions &&
    error.extensions.response
  ) {
    let errorStatus = getErrorStatus(error.extensions.response);
    let errorMessage = getErrorMessage(error.extensions.response);

    return errorType[errorStatus](errorMessage, timestamp);

  } else {
    return error;
  }
};

export default errorBuilder;
