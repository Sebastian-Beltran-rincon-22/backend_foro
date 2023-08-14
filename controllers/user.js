const User = require('../models/user.js')

const controllerUser = {
    create: async (req, res) => {
        try {
            const user_name = req.body.user_name
            const user_image = req.body.user_image
            const user_email = req.body.user_email
            const user_password = req.body.user_password
            await User.create({
                user_name: user_name,
                user_image: user_image,
                user_email: user_email,
                user_password: user_password
            })
            res.json({ msg: 'Create' })
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },

    getUser: async (req, res) => {
        try {
            const users = await User.find({})
            res.json(users)
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },

    getUserById: async (req, res) => {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            res.json(user)
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params
            const user_name = req.body.user_name
            const user_image = req.body.user_image
            const user_email = req.body.user_email
            const user_password = req.body.user_password
            await User.findByIdAndUpdate(id, {
                user_name: user_name,
                user_image: user_image,
                user_email: user_email,
                user_password: user_password
            })
            res.json({ msg: 'update' })
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params
            await User.findByIdAndDelete(id)
            res.json({ msg: 'Delete' })
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    }
}

module.exports = controllerUser