const mongoose = require('mongoose');

const Publication = require('../models/publications');
const publication = require('../models/publications');

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
    },
    getPublicationById: async (req, res) => {
        try {
            const { id } = req.params
            const publication = await Publication.findById(id)
            res.json(publication)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updatePublication: async (req, res) => {
        try {
            const { id } = req.params
            const user = req.body.user
            const description = req.body.description
            const image = req.body.image
            const reactions = req.body.reactions
            const comments = req.body.comments

            await Publication.findByIdAndUpdate(id, {
                user: user,
                description: description,
                image: image,
                reactions: reactions,
                comments: comments
            })
            res.json({ msg: 'Update' })
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    },
    deletePublication: async (req, res) => {
        try {
            const { id } = req.params
            await publication.findByIdAndDelete(id)
            res.json({ msg: "Publication deleted" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = controllerPublication