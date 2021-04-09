const Userr = require('../models/user.model');
exports.getAllUsers = async (req, res) => {
    try{
        let query = Userr.find();

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 4;
        const skip = (page - 1) * pageSize;
        const total = await Userr.countDocuments();

        const pages = Math.ceil(total / pageSize);

        query = query.skip(skip).limit(pageSize);

        if (page > pages) {
        return res.status(404).json({
            status: "fail",
            message: "No page found",
        });
        }

        const result = await query;

        res.status(200).json({
        status: "success",
        count: result.length,
        page,
        pages,
        data: result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        status: "error",
        message: "Server Error",
        });
    }
};