var express = require('express');
const app = express();
var router = express.Router();

let Product = require('../models/product');

// Get All Products
router.route('/products').get((req, res) =>{
    Product.find((err, products) =>{
        if(err){
            return next(err);
        } else {

          //Calculate the days before expiry
          var currentDate = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())

          for (var i = 0; i< products.length; i++){
            var expiryDate = new Date(products[i]['expiry']);

            // get difference in Seconds
            const diffTime = expiryDate.getTime() - currentDate.getTime();
            //Convert seconds to Days
            const diffDays = diffTime / (1000 * 3600 * 24);
            //Round
            products[i]['days'] = Math.round(diffDays);
          }
          res.json(products);
        }
    });
});

 // Get One product
 router.route('/product/:id').get((req, res) => {
     Product.findById(req.params.id, (err, data) =>{
         if(err){
             return next(err);
         }
         
         res.json(data);
     });
 });

 // Create Product
 router.route('/add-product').post((req, res, next) => {
    Product.create(req.body, (error, product) => {
      if (error) {
        return next(error)
      } else {
          res.json(product)
        }
    })
  });

 //Update Product
 router.route('/edit-product/:id').put((req, res, next) =>{
     Product.findByIdAndUpdate(req.params.id, {
         $set: req.body
     }, (err, product) => {
         if(err){
             return next(err);
             console.log(err);
         } else{
           res.json(product)
           console.log('Data updated successfully');
         }
     });
 });

 // Delete Product
router.route('/delete-product/:id').delete((req, res, next) => {
    Product.findOneAndRemove(req.params.id, (error, product) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: product
        })
      }
    })
  })


module.exports = router