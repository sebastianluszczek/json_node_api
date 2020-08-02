class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
module.exports = {
    ErrorHandler
}

const handleError = (err, res) => {
    let { statusCode, message } = err;
    // Defaults error 
    if (statusCode === undefined) statusCode = 500;
    if (message === undefined) message = "Unhandled service error";
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};

module.exports = {
    ErrorHandler,
    handleError
}