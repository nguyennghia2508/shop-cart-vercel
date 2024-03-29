const {check}  = require('express-validator')
const path = require('path');
const Product = require('../../models/Product');

module.exports = [
    check('name')
    .exists().withMessage('Please enter valid product name')
    .notEmpty().withMessage('Please enter product name')
    .custom((value, { req }) => {
        return Product.findOne({name: value}).then(user => {
            if (user) {
                return Promise.reject('Product already exist');
            }
            else
            {
                return true
            }
        });
    }),

    check('number')
    .exists().withMessage('Please enter number')
    .notEmpty().withMessage('Please enter valid number')
    .isInt({ min:0}).withMessage('Please enter number'),

    check('price')
    .exists().withMessage('Please enter price')
    .notEmpty().withMessage('Please enter price')
    .isInt({ min:0}).withMessage('Please ener valid price'),

    check('dom').exists().withMessage('Please enter valid date of manufacture')
    .notEmpty().withMessage('Please enter date'),

    check('type').exists().withMessage('Please enter valid type')
    .notEmpty().withMessage('Please enter type')
    .isIn(['Laptop', 'Smartphone', 'Camera']).withMessage('Invalid type'),

    check('myImage')
    .custom((value,{req,next}) =>{
        var img = req.files.myImage
        if(img)
        {
            return true;
        }
        else
        {
            return false
        }
    }).withMessage("Image not empty")
]