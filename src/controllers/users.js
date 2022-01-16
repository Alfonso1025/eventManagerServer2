const pool=require('../services/db')
const jwtGenerator=require('../services/jwtGenerator')
const Resolver= require('../services/resolver')
const bcrypt= require('bcrypt')



module.exports = {
    test:(req, res)=>{
        console.log(resolver.success('success', null))
        res.send(resolver.success('success', null))
    },

    registeruser: async (req, res)=>{
        const resolver=Resolver(res)
        try{
            const{userName, userEmail, userPassword}=req.body
            const user= await pool.query("SELECT * FROM users WHERE user_email=$1",
            [userEmail])
            console.log(user)
            if(user.rows.length!==0) return res.status(401).send('user already exist')
    
            const saltRound =10
            const salt= await bcrypt.genSalt(saltRound)
            const bcryptPassword= await bcrypt.hash(userPassword, salt)
            
            const newUser= await pool.query("INSERT INTO users(user_name, user_email, user_password) VALUES($1,$2,$3) RETURNING *",
            [userName, userEmail, bcryptPassword])
            
    
            const token= await jwtGenerator(newUser.rows.user_id)
            resolver.success(token,'user regitered succesfully')
    
    
        }
    
        catch(err){
            console.log(err)
            res.status(500).send('server error')
        }
        
    },

    login:async(req, res)=>{
        const resolver=Resolver(res)
        try{
            const{userEmail, userPassword}=req.body
            const user=  await pool.query("SELECT * FROM users WHERE user_email=$1",
            [userEmail])
            if( user.rows.length===0) return  res.status(401).send('user does not exist')
    
            const validPassword= await bcrypt.compare(userPassword, user.rows[0].user_password)
            if(!validPassword) return res.status(401).send('the password is incorrect')
    
            const token = jwtGenerator(user.rows[0].user_id)
            resolver.success(token,'loged in succesfully')
    
    
            }
            catch(err){
                console.log(err)
                res.status(500).send('server error')
    
            }
    
    },
    isVerified:async(req, res)=>{
        try {
            res.json(true)
        } catch (err) {
    
            console.log(err)
                res.status(500).send('server error')
            
        }

    }
}