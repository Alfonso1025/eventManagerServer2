const pool= require('../services/db')
const Resolver=require('../services/resolver')
module.exports={
    dashboard:async(req, res)=>{

        try {
            const resolver=Resolver(res)
            //req.user returns the user_id
            const user=await pool.query("SELECT user_name  FROM users WHERE user_id=$1",
            [req.user], (err, resolve)=>{
                if(!err) return resolver.success(resolve.rows[0], "success")
                resolver.failed(err, "could not get user")
            })
           
        
            
        } catch (err) {
            console.log(err)
        }
    }
}