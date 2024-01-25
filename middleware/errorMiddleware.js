class CustomAPIError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode);
}

const errorHandleMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({message: err.message})
    }
    return res.status(500).json({message: `Something went wrong, please try again`});
}

const notFound = (req, res) => {
    res.status(404).send('Route doesn\'t exist')
}

const asyncWrapper = (fn) => {
    return async(req, res, next) => {
        try {
            await fn(req, res, next)
        }catch(error) {
            next(error)
        }
    }
}
module.exports = {notFound, CustomAPIError, errorHandleMiddleware, asyncWrapper, createCustomError}