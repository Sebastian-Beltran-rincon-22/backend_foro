const mongoose = require('mongoose');

const Publication = require('../models/publications');

const controllerPublication = {
    create: async (req, res) => {
        try {
            const user = req.body.user
            const date_create = new Date();
            const description = req.body.description
            const image = req.body.image
            const reactions = req.body.reactions
            const comments = req.body.comments

            await Publication.create({
                user: user,
                date_create: date_create,
                description: description,
                image: image,
                reactions: reactions,
                comments: comments
            });
            console.log('Publication created');
            res.json({ msg: 'created' });
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getPublication: async (req, res) => {
        try {
            const publications = await Publication.find({})
            res.json(publications)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = controllerPublication