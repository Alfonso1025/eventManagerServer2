const pool = require('../services/db')
const Resolver= require('../services/resolver')

module.exports={
    createEvent:async(req, res)=>{
        const resolver= Resolver(res)
        try { 
            const userId= req.user
            console.log(userId)
            console.log(req.body)
            const{weddingName, groom, bride, location, date }=req.body
            const newEvent=await pool.query
            ('INSERT INTO events(user_id, wedding_name, bride_name, groom_name,wedding_location, wedding_date) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
            [userId, weddingName, groom,bride,location,date ])
            resolver.success(newEvent.rows,'success')
        } catch (error) {
            console.log(error.message)
        }
    },
    listEventById: async(req, res)=>{
        const resolver=Resolver(res)
        try {
            const userId=req.user
            console.log(userId)
            const event=await pool.query("SELECT * FROM events WHERE user_id=$1",
            [userId], (err,resolve)=>{
                if(!err) return resolver.success(resolve.rows, "success")
                resolver.failed(err,"could not get event" )
            })
           
        } catch (error) {
            console.log(error.message)
        }
    },

    /* , (err,resolve)=>{
               if(!err) return resolver.success(resolve.rows,"updated succesfully")
                resolver.failed(err,"could not update event") 
           }*/
    //update event values on a single query
    modifyEvent:async(req, res)=>{
        const resolver=Resolver(res)
        try {
            
           const eventId= req.params.eventId 
           const {updatedWedding,updatedGroom,updatedBride,updatedLocation,updatedDate}=req.body
           console.log(req.body)
           const updatedEvent=await pool.query("UPDATE events SET wedding_name=($1),groom_name=($2),bride_name=($3),wedding_location=($4),wedding_date=($5) WHERE wedding_id=($6)",[
               updatedWedding,updatedGroom,updatedBride,updatedLocation,updatedDate,eventId
           ] )
           
        } 
        catch (error) {
            console.log(error.message)
        }
    },
    //delete event 
    //how to delete event when a guest belongs to the event as is relate by
    //wedding_id
    deleteEvent:async(req, res)=>{  
        const resolver=Resolver(res)
        try{
            const eventId=req.params.eventId
            
            const deleteRelatedGuest= await pool.query('DELETE FROM guest_list WHERE wedding_id=$1',
            [eventId])
            const deletedEvent= await pool.query('DELETE FROM events WHERE wedding_id=$1',
            [eventId], (err, resolve)=>{
                if(!err) return resolver.success(deletedEvent,"deleted successfully")
                 
                resolver.conflict(err, "could not delete event")
            })
            
            
        }
        catch(err){
            console.log(err)
        }

    }


}