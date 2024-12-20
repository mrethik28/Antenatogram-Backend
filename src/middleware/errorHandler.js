export async function errorHandler(err, req, res, next) {
    return res.status(500).send({"error": {"type" : `${typeof err}}`, "message" : `${err.message}`}});
}