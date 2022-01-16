const pool=require('../services/db')
const Resolver=require('../services/resolver')

module.exports={
    guestCheckIn:async(req, res)=>{
        
        try {
            
            const code=req.params.code
            const guest=await pool.query('SELECT * FROM guest_list WHERE code=$1',
            [code])
            console.log(guest.rows.guestlist_id)

            if(guest.rows.lenght!==0) return res.send(guest.rows)
            

        } catch (error) {
            console.log(error)
        }
    },
    updateIsAttending:async(req,res)=>{
        const resolver=Resolver(res)
        try {
            const guestId=req.params.guestId
            const isAttending=req.body.isAttending
            console.log(isAttending)
            const newIsAttending= await pool.query('UPDATE guest_list SET isattending=$1 WHERE guestlist_id=$2',
            [isAttending,guestId], (err,resolve)=>{
                if(!err) return resolver.success(isAttending,"updated succesfully")
                resolver.failed(err,"could no update")
            })
            
            
        } catch (error) {
            console.log(error)
        }
    },
    getEvent:async(req,res)=>{
        try {
            const weddingId=req.params.weddingId
            console.log(weddingId)
            const event=await pool.query("SELECT * FROM events WHERE wedding_id=$1",
            [weddingId])
            res.send(event.rows)
        } 
        catch (error) {
            console.log(error)
        }
    }
}