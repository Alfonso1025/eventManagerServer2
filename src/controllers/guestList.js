const pool=require('../services/db')
const Resolver=require('../services/resolver')

module.exports={
    createGuest:async(req, res)=>{
        const resolver=Resolver(res)
        try {
            //obtain the eventId from request
            const eventId= await req.params.eventId
            //destructure req.body to obtain data
            const {guestName, guestLastName, guestEmail, code, isAttending}=req.body
            //post data to table gueslist
            const newGuest=await pool.query('INSERT INTO guest_list(wedding_id, guest_name, guest_last_name, guest_email,code,isAttending)values($1,$2,$3,$4,$5,$6) RETURNING*',
            [eventId, guestName,guestLastName, guestEmail,code,isAttending])
            //send response
            resolver.success(newGuest.rows,"guest created succesfully")
        } catch (error) {

            console.log(error)
            
        }
       
    },
    //each guest bolongs to an event. A guest can be found
    //by the event id
    listGuestByEvent:async(req, res)=>{
        const resolver=Resolver(res)
    try {
//obtain wedding_id from params in the request
        const eventId=req.params.eventId
//query to table guest_list
        const listOfGuest= await pool.query('SELECT * FROM guest_list WHERE wedding_id=$1',
        [eventId])
        console.log(listOfGuest.rows)
        if(listOfGuest.rows.length < 1) return resolver.success(listOfGuest.rows, 'no_guest_yet')

        return resolver.success(listOfGuest.rows, "success")
        
        } 
        catch (error) {
            console.log(error.message)
            return resolver.internalServerError(error, error.message)
          
        }
    },
    //update guest by id
    modifyGuest:async(req,res)=>{
        const resolver=Resolver(res)
        try {
            const guestId=req.params.guestId
            const  {guestName, guestLastName, guestEmail, code, isAttending}=req.body
            const updatedGuest=await pool.query('UPDATE guest_list SET guest_name=$1,guest_last_name=$2,guest_email=$3,code=$4,isAttending=$5 WHERE guestlist_id=$6',
            [guestName,guestLastName,guestEmail,code,isAttending,guestId],
            (err,resolve)=>{
                if(!err) return resolver.success(updatedGuest,"updated succesfully")
                return resolver.internalServerError(err,err.message)
            })
            
        } catch (error) {
            console.log(error)
            return resolver.internalServerError(error, error.message)

        }
    },
    //delete guest by id
    deleteGuest:async(req,res)=>{
        const resolver=Resolver(res)
        try {
            const guestId=req.params.guestId
            const deletedGuest=await pool.query('DELETE FROM guest_list WHERE guestlist_id=$1',
            [guestId], (err, resolve)=>{
                if(!err) return resolver.success(deletedGuest,"deleted succesfully")
                
                resolver.failed(err,"could no delete guest")
            })
        } catch (error) {
            
        }
    }

}