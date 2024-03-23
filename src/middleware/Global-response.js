export const Error_handel = (dev) => {
    return (error, req, res, next) => {
    if (error) {
        if ((dev == "dev")) {
        return res.status(error["cause"] || 500).json({
            ErrorMsg: error.message,
            error: error.stack,
        });
    }
    if ((dev == "front")) {
        return res.status(error["cause"] || 500).json({
        ErrorMsg: error.message,
        });
    }
    }
};
};
