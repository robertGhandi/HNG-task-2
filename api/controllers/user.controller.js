const { getUserById } = require('../models/user.model');

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User retrieved successfully',
            data: {
                userId: user.userid,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(400).json({
            status: 'Bad request',
            message: 'Unable to fetch user',
            statusCode: 400,
        });
    }
};

module.exports = { getUser };