
const { encrypt, compare } = require('./helpers/handleBcrypt')
//const { tokenSign } = require('./helpers/generateToken')

const loginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        
        if (!user){
            res.status(404)
            res.send({ error: 'User not found' })
        }
        
        const checkPassword = await compare(password, user.password)
        //const tokenSession = await tokenSign(user)
        if (checkPassword) {
            res.send({
                data: user
                //token: tokenSession
            })
            return
        }
        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid Password'
            }) 
            return
        }   

    }
    catch (error) {
        console.error(error);
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
      }
}
module.exports =  {
    loginCtrl
}





