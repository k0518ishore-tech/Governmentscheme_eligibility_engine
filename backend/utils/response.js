// ============================================================
// SchemeGuide Backend — Standardized API Response Helpers
// ============================================================

export const successResponse = (res, data = {}, message = 'Request successful', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res, message = 'Something went wrong', statusCode = 500, errorCode = 'SERVER_ERROR', details = null) => {
  const response = {
    success: false,
    message,
    error: {
      code: errorCode,
    },
  };
  if (details) response.error.details = details;
  return res.status(statusCode).json(response);
};

export const validationErrorResponse = (res, errors) => {
  return res.status(422).json({
    success: false,
    message: 'Validation failed',
    error: {
      code: 'VALIDATION_ERROR',
      details: errors,
    },
  });
};
