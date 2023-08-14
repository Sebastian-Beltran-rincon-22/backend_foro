const express = require('express')

const controllerPublication = require('../controllers/publications')


const router = express.Router()

router.post('/create', controllerPublication.create)
router.get('/', controllerPublication.getPublication)
router.get('/:id', controllerPublication.getPublicationById)
router.patch('/update/:id', controllerPublication.updatePublication)
router.delete('/delete/:id', controllerPublication.deletePublication)

module.exports = router