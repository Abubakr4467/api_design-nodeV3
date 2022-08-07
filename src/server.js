import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { signup, signin, protect } from './utils/auth'
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import itemRouter from './resources/item/item.router'
import listRouter from './resources/list/list.router'
import { add } from 'lodash'



export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)
app.use('/api/list', listRouter)



app.get('/', (req, res, next)=> {
  res.send({message: 'hello'});
  
})

app.get('/data', (req,res)=>{
  console.log({data: [1,2,3]})
})

app.post('/data',(req,res)=>{
  console.log(req.body)
  res.send({ok: true})
})

app.post('/', (req,res)=>{
  console.log(req.body)
  res.send({meessage: 'ok'})
})


//middleware

const log = (req,res) =>{
  console.log('logging')
  next()
}


// app.use(log)

// app.get('/data', [log, log,log] ,(req,res)=>{
//   console.log({data: [1,2,3]})
// })

//same like controller

app.get('/data', log, (req,res)=>{
  console.log({data: [1,2,3]})
})



//rautes with express
// REST 
// Match routes


//exact one  , 
// app.get('/data'), ...

//match on parametrs 
// app.get('/:id'), ...

//regex 
// app.get('^(me)',  ...

//match on globe 
// app.get('/user/*'), ...



//create rest api
//CRUD

// create read update destroy
 

 
  
//   app.post('/data', (req,res) =>{ //create
//     res.send({data: req.mydata})
//   } )    
 
//   app.get('/', log, (req,res)=>{      //read
//        res.send({data: req.mydata})
//   })

//   app.put('/data',  (req,res)=>{         //update
  
//   })

// app.delete('/data', (req,res) => )    //delete




//route order does matter 

//router & sub routes
// const router = express.Router()   //listen on port 

// router.get('/me', (req,res)=>{
//   res.send({me: 'hello'})
// })

// //mounting 
// app.use('/api', router)   //deligate to that     /api/me   ans: me 

// app.use('/diff', router)


//cats
// const routers = ['get /cat', 'get /cat/:id', 'post /cat', 'delete /cat/ :id']

// router.route('/cat')
//   .get()
//   .post()


//   router.router('/cat/:id')
//     .get()
//     .put()
//     .delete()

//   app.use('/api', router);





// export const start = () => {
//   app.listen(3000, ()=>{
//     console.log('server is on 3000')
//   })
// }



// app.use(itemRouter)

app.use('api/item' , itemRouter)




export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}


