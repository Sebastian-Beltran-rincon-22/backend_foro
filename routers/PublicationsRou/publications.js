const express = require('express')
const authJwt = require('../../middlewares/authJwt')
const controllerPublication = require('../../controllers/publicationsControllers/publications')


const router = express.Router()

router.post('/create', authJwt.verifyToken,controllerPublication.create)
router.get('/', controllerPublication.getPublication)
router.get('/:id', controllerPublication.getPublicationById)
router.patch('/update/:id',authJwt.verifyToken,controllerPublication.updatePublication)
router.delete('/delete/:id',[authJwt.verifyToken,authJwt.isAdmin],controllerPublication.deletePublication)

module.exports = router
