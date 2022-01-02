
module.exports= async(req, res, next)=>{
    console.log('this is the test middleware')
     try {
        const eventId=req.header("eventId")
        console.log('from middleware', eventId)

        if(!eventId) return res.status(403).json('no eventId')

        
        next();
    } catch (error) {
        console.error(error.message)
        return res.status(403).json('not authorized')
    } 
}