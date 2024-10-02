export async function errorHandler(err, req, res, next) {
    return res.status(500).send({"error": `${err.message}`});
}