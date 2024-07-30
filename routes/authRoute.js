import express from 'express';
import { forgotPasswordController, registerController } from '../controllers/authController.js'
import { loginController } from '../controllers/authController.js';
import { testController } from '../controllers/authController.js';
import { isAdmin, requireSigIn } from '../middlewares/authMiddleware.js';
//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST
router.post('/register', registerController)

//LOGIN ||POST
router.post('/login', loginController)

//forgot password || POST
router.post('/forgot-password', forgotPasswordController)

//test 
router.get('/test', requireSigIn, isAdmin, testController)

//protected user route auth
router.get('/user-auth', requireSigIn, (req, res) => {
    res.status(200).send({ ok: true })
})

//Admin route
router.get('/admin-auth', requireSigIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})



export default router;