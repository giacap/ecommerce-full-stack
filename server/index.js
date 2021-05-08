require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const path = require('path')
const Product = require('./models/Product')
const User = require('./models/User')
const Order = require('./models/Order')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const bodyParser = require('body-parser')

//create a JWT
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: 24 * 60 * 60
    })
}



//multer setup
const multer = require('multer')
const { decode } = require('punycode')
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter})
//


app.use(express.static(path.join(__dirname, '../', 'client', 'build')))
app.use(express.json())





app.get('/uploads/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'uploads', req.params.id))
})














//admin routes

//require admin authentication middleware
const requireAdminAuth = (req, res, next) => {

    const verifyAdmin = async (decodedToken) => {
        const user = await User.findById(decodedToken.id)
        console.log(user.isAdmin)
        if(!user.isAdmin){
            res.redirect('/')
        } else {
            res.locals.decodedToken = decodedToken
            next()
        }
    }


    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                res.redirect('/')
            } else {
                verifyAdmin(decodedToken)
            }
        })
    } else {
        res.redirect('/')
    }
}

app.get('/addproduct', requireAdminAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'))
})


//add product
app.post('/addproduct', requireAdminAuth, upload.single('image'), async (req, res) => {
    let imgpath;
    if(req.file){
        imgpath = req.file.path
    } else {
        imgpath = 'uploads/default.jpg'
    }

    try {
        const product = await Product.create(
                {name: req.body.name, description: req.body.description, price: req.body.price, image: imgpath}
            )
        return res.redirect('/')
    } catch (err) {
        return res.status(500).json({
            success: false
        })
    }
})






app.get('/orders', requireAdminAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'))
})

app.get('/api/orders', requireAdminAuth, async (req, res) => {
    try {
        const orders = await Order.find()
        return res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        return res.status(500).json({
            success: false
        })
    }
})




app.get('/deleteproduct', requireAdminAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'))
})

app.delete('/deleteproduct', requireAdminAuth, async (req, res) => {
    try {
        const product = await Product.findById(req.body.productID)
        await product.remove()
        return res.status(200).json({
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            success: false
        })
    }
})



app.get('/updateproduct', requireAdminAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'))
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/updateproduct', requireAdminAuth, urlencodedParser, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.body.id, {name: req.body.name, description: req.body.description, price: req.body.price})
        //return res.redirect('/')
        return res.sendStatus(200)
    } catch (error) {
        return res.sendStatus(500)
    }
    
})





















//customer routes

//get products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json({
            success: true,
            data: products
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'error'
        })
    }   
})


//get selected product info
app.get('/api/productinfo/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        return res.status(200).json({
            success: true,
            data: product
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'error'
        })
    }
})


//find by name
app.get('/api/searchproductbyname/:id', async (req, res) => {
    
    try {
        
        const product = await Product.find({"name" : {$regex :  req.params.id }})
        
        if(!product){
            return res.status(400).json({
                success: false,
                error: "can't find product"
            })
        } else {
            return res.status(200).json({
                success: true,
                data: product
            })
        }
     
    } catch (err) {
       
        return res.status(500).json({
            success: false,
            error: 'error'
        })
    }
})








//create user (sign up)
app.post('/signup', async (req, res) => {
    
    try {
        const user = await User.create({username: req.body.username, password: req.body.password})

        //create jwt and store it in a cookie
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'Lax'
        })

        return res.status(201).json({
            success: true,
            data: user
        })
    } catch (err) {
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message)
            return res.status(404).json({
                success: false,
                error: messages
            })
        } else if(err.name === 'MongoError'){
            const user = err.keyValue.username
            return res.status(404).json({
                success: false,
                error: [`${user} is already registered`] 
            })
        } else {
            return res.status(500).json({
                success: false,
                error: ['server error']
            })
        }
    }
})









//log in
app.post('/login', async (req, res) => {
    const user = await User.findOne({username: req.body.username})
    if(!user){
        return res.status(400).json({success: false, error: 'incorrect username'})
    }

    try {
        const auth = await bcrypt.compare(req.body.password, user.password)
        if(auth){
            const token = createToken(user._id)
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'Lax'
            })
            return res.status(200).json({success: true})
        } else {
            return res.status(400).json({success: false, error: 'incorrect password'})
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'server error'
        })
    }
})







//check current user on page loading
app.get('/user', (req, res) => {
    try {
        const token = req.cookies.jwt
        
        if(token){
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if(err){
                    return res.status(400).json({
                        success: false,
                        message: 'no current user'
                    })
                } else {
                    const user = await User.findById(decodedToken.id)
                    return res.status(200).json({
                        success: true,
                        currentUser: user
                    })
                }
            })
        } else {
            return res.status(400).json({
                success: false,
                message: 'no current user'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'server error'
        })
    }
})



//logout
app.get('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
})







//add product to cart
app.put('/addtocart', async (req, res) => {

    const addItem = async (decodedToken) => {
        const user = await User.findById(decodedToken.id)
        
        let isPresent;
        let product;
        let amount;
        user.cart.map((prod) => {
            if(prod._id == req.body.productToAdd){
                product = prod._id
                amount = prod.qty
                isPresent = true
                return
            }
        })
        
        if(isPresent){
            const query = { _id : decodedToken.id }
            const updateDocument = {
                $set: { "cart.$[orderItem].qty": amount + parseInt(req.body.qty)}
            };
            const options = {
                arrayFilters: [{
                  "orderItem._id": product,
                }]
              };
            const result = await User.updateOne(query, updateDocument, options)
        } else {

            const productToAdd = await Product.findById(req.body.productToAdd)
            const newProductInCart = {
                _id: productToAdd._id.toString(),
                name: productToAdd.name,
                description: productToAdd.description,
                price: productToAdd.price,
                image: productToAdd.image,
                createdAt: productToAdd.createdAt,
                v: productToAdd.__v,
                qty: parseInt(req.body.qty),
            }

            const user = await User.findByIdAndUpdate(decodedToken.id, {$push: {cart: newProductInCart}})
        }
    }



    //validate qty input
    if(isNaN(req.body.qty) || req.body.qty < 1){
        return res.status(400).json({success: false, msg: 'Invalid Qty'})
    }



    try {

        const token = req.cookies.jwt
        if(token){
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if(err){
                    return res.status(403).json({
                        success: false,
                        msg: 'log in to add product to cart'
                    })
                } else {
                    addItem(decodedToken)
                    return res.status(201).json({
                        success: true
                    })
                }
            })
        } else {
            return res.status(403).json({
                success: false,
                msg: 'log in to add product to cart'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'error'
        })
    }
})





//verify if user is authenticated middleware
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                res.redirect('/signup')
            } else {
                res.locals.decodedToken = decodedToken
                next()
            }
        })
    } else {
        res.redirect('/signup')
    }
}




//cart page
app.get('/cart', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'))
})


//handle cart in cart page (adding single item)
app.put('/api/editcart/addsingle', requireAuth, async (req, res) => {
    //find previous quantity
   
    const user = await User.findById(res.locals.decodedToken.id)
    let qty;
        user.cart.map((prod) => {
            if(prod._id === req.body.productID){
                qty = prod.qty
                return
            }
        })
    const query = { _id : res.locals.decodedToken.id }
    const updateDocument = {
        $set: { "cart.$[orderItem].qty": qty + 1}
    };

    const options = {
        arrayFilters: [{
            "orderItem._id": req.body.productID,
        }]
    };
    
    const result = await User.updateOne(query, updateDocument, options)
    return res.json({success: true})
})


//handle cart in cart page (removing single item)
app.put('/api/editcart/removesingle', requireAuth, async (req, res) => {

    //find previous quantity
    const user = await User.findById(res.locals.decodedToken.id)
    let qty;
        user.cart.map((prod) => {
            if(prod._id === req.body.productID){
                qty = prod.qty
                return
            }
        })
    
    if(qty < 2){
        return res.status(400).json({success: false});
    } else {
        
        const query = { _id : res.locals.decodedToken.id }
        const updateDocument = {
            $set: { "cart.$[orderItem].qty": qty - 1}
        };

        const options = {
            arrayFilters: [{
                "orderItem._id": req.body.productID,
            }]
        };
        
        const result = await User.updateOne(query, updateDocument, options)
        return res.json({success: true})

    }
})




//handle cart in cart page (removing item)
app.put('/api/editcart/remove', requireAuth, async (req, res) => {
    
    try {

        const deletedProduct = await User.updateOne(
            { _id : res.locals.decodedToken.id},
            { $pull: {cart: {_id: req.body.productID} } }
        )

        return res.status(200).json({success: true, deletedProduct: deletedProduct})
    } catch (error) {
        return res.status(500).json({success: false})
    }
    
    
})




app.put('/checkout', requireAuth, async (req, res) => {

    try {
        
        const user = await User.findById(res.locals.decodedToken.id)
        const products = user.cart
        
        userOrder = products.map((product) => {
            product.date = new Date();
            return product
        })

        userOrder.forEach( async (product) =>{
            const resultingOrder = await User.findByIdAndUpdate(res.locals.decodedToken.id, {$push: {orders: product}})
            
        })

        const emptyCart = await User.findByIdAndUpdate(res.locals.decodedToken.id, {cart: []})

        //send order to DB when admin can see it
        const orderForAdmin = await Order.create({userId: res.locals.decodedToken.id, date: new Date(), products: userOrder})

        return res.status(200).json({
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            success: false
        })
    }
   
    
})








//all remaining routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'))
})


















//connect to DB and listen for connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('connected to db')
        app.listen(PORT, () => console.log('server running on port ' + PORT))
    } catch (err) {
        console.log('error: ' + err.message)
        process.exit(1)
    }
}

connectDB()
//


