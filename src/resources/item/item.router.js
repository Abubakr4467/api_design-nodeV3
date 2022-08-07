import { Router } from 'express'
import controllers from './item.controllers'




const router = Router()

// /api/item
// router.get('/api/item')   issue with mounting happens



const controller = (req,res)=>{
  res.send({message: 'hello'})
}

// /api/item ==
router.route('/')   //relative
.get(controller)
.post(controller)

// /api/item/:id  equal to below
router.route('/:id')
.put(controller)
.delete(controller)
.get(controller)



  









router
  .route('/')
  .get(controllers.getOne)
  .post(controllers.createOne)

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router





router 
 .route('/')
 .get((req,res)=>{
  // res.status(404) // seting code before res
  // res.end()  status chainable
  res.status(404).send({message: 'not found'})
  // res.send() // no go

  // explicite 
  res.status(404).json({message: 'hello'})

 })

  .post(controllers.createOne)

  