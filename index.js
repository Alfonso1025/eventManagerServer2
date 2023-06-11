
const express= require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()


app.listen(process.env.PORT, ()=>{
    console.log('app is running in port', process.env.PORT)
})

app.use(express.json())
app.use(cors())
app.get('/',(req, res)=>{
    res.send('hello world from event manager test route.')
})
app.use('/users', require('./src/routes/users'))
app.use('/dashboard', require('./src/routes/dashboard'))
app.use('/event', require ('./src/routes/events'))
app.use('/guestlist',require('./src/routes/guestList'))
app.use('/checkin/',require('./src/routes/guestCheckIn'))