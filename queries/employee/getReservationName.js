export default {
    run: (req, res) => {
        res.send(req.query.test + " test worked bro")
    }
}