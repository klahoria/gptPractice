
function validateRequestBody(schema) {
    return function (req, res, next) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({
                    error: 1,
                    message: 'Request body is missing. Please provide the required data.'
                });
            }

            const { error, value } = schema.validate(req.body, { abortEarly: false });

            if (error) {
                // Customize error details
                function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }

                const customErrorDetails = error.details.map(detail => {
                    return {
                        field: detail.path.join('.'),  // Which field caused the error
                        message: capitalizeFirstLetter(String(detail.message.replace(/\"/g, ""))),       // The error message
                        type: detail.type              // Type of validation that failed
                    };
                });

                return res.status(400).json({
                    error: 1,
                    message: customErrorDetails[0].message,
                    // validationErrors: customErrorDetails // Provide the customized error details
                });
            }

            // Attach the validated value to the request object
            req.validatedBody = value;

            // Continue to the next middleware
            next();
        } catch (err) {
            // Handle unexpected errors
            console.error('Validation Error:', err); // Optional logging
            return res.status(500).json({
                error: 1,
                message: 'Internal Server Error. Please try again later.',
                details: err.message
            });
        }
    };
}

function validateRequestParams(schema) {
    return function (req, res, next) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({
                    error: 1,
                    message: 'Request body is missing. Please provide the required data.'
                });
            }

            const { error, value } = schema.validate(req.params, { abortEarly: false });

            if (error) {
                // Customize error details
                function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }

                const customErrorDetails = error.details.map(detail => {
                    return {
                        field: detail.path.join('.'),  // Which field caused the error
                        message: capitalizeFirstLetter(String(detail.message.replace(/\"/g, ""))),       // The error message
                        type: detail.type              // Type of validation that failed
                    };
                });

                return res.status(400).json({
                    error: 1,
                    message: customErrorDetails[0].message,
                    // validationErrors: customErrorDetails // Provide the customized error details
                });
            }

            // Attach the validated value to the request object
            req.validatedBody = value;

            // Continue to the next middleware
            next();
        } catch (err) {
            // Handle unexpected errors
            console.error('Validation Error:', err); // Optional logging
            return res.status(500).json({
                error: 1,
                message: 'Internal Server Error. Please try again later.',
                details: err.message
            });
        }
    };
}

export { validateRequestBody, validateRequestParams };
