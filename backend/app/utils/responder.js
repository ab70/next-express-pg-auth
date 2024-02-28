const responder = (res, code, success, message, data) => {
    const responseObj = { success: success, message: message };
    if (data) {
        responseObj.data = data;
    }
    return res.status(code).json(responseObj);
};

module.exports = responder;