const { Pool } = require('pg');
const { encrypt, compare } = require('./helpers/handleBcrypt');

//Conexion a la Base de Datos de Postgres
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'intellinext',
    port: '5432'

});

// Login Function
const loginCtrl = async (req, res) => {
        console.log('ENTRANDO AL LOGIN')
    try {
        const { email, password } = req.body
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        
        if (!user){
            res.status(404)
            res.send({ error: 'User not found' })
        }
        
        if(user){
            const psss = await pool.query('SELECT password FROM users WHERE email = $1', [email])
            console.log(psss.rows[0].password)
            console.log(password)
            const checkPassword = await compare(password, psss.rows[0].password)
            //const tokenSession = await tokenSign(user)
            if (checkPassword) {
                res.send({
                    msg: 'Logged in Succsesfully!',
                                       
                    data: user.rows[0]

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
        
    }
    catch (error) {
        console.error(error);
      }
}

//Function to get the list of Users
const getUsers = async (req, res) => {
    console.log('GET USERSS')
    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows);
};

//Function to get one User
const getUser = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id])//res.send('ID del User ' + req.params.id);
    res.json(response.rows)
};

//Function to Create one User
const createUser = async (req, res) => {
    const {email, name, phone, address, password } = req.body; //console.log(req.body);
    const passwordHash = await encrypt(password)
    const response = await pool.query('INSERT INTO users (email, name, phone, address, password) VALUES ($1, $2, $3, $4, $5)', [email, name, phone, address, passwordHash]);
    console.log(response);
    //res.send({data: response})
    res.json({
        msg: 'User added Succsesfully!',
        body: {
            user: {name, email, password}
        }
    });
};

//Function to Delete one User
const deleteUser = async (req, res) =>  {
    const id = req.params.id;
    //res.status(204)//.json(response.rows);
    const response = await pool.query('DELETE FROM users WHERE id = $1', [id])
    res.send(`User ${id} deleted Succsesfully!`);
}

//Function to Update one User
const updateUser = async (req, res) => {
    const id = req.params.id;
    const {email, name, phone, address, password} = req.body; //console.log(req.body);
    const passwordHash = await encrypt(password) // Se mantiene el encrypt incluso para la actualizacion del registro
    const response = await pool.query('UPDATE users SET email = $1, name = $2, phone = $3, address = $4, password = $5 WHERE id = $6',  [
        email, 
        name, 
        phone, 
        address, 
        passwordHash, 
        id
    ])
    //console.log(response);
    res.json({
        msg: 'User udated Succsesfully.',
        body: {
            user: {name, email}
        }
    });
}
module.exports =  {
    loginCtrl,
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}