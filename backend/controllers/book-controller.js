const Book = require("../model/Book");

const getAllBooks = async (req, res) =>{
    // console.log("Getting all books from the database")
    let books ;
    try{
        books = await Book.find();
    }catch(err){
        console.log(err);;
    }
    if(!books){
        return res.status(404).json({message:"No Products Found"});
    }
    return res.status(200).json({books});
}

const addBook = async (req, res) => {
    let book ;
    // const {name , author , description , price , available , image } = req.body ;
    try{
        book = new Book({
            name : req.body.name, 
            author : req.body.author,
            description : req.body.description , 
            price  : req.body.price, 
            available : req.body.available, 
            image : req.body.image
        });
        await book.save();
    }catch(err){
        console.log(err);
    }
    if(!book){
        return res.status(500).json({message : "Unable to upload "});
    }
    return res.status(201).json({book});
}
const getById = async (req, res) => {
    let book ; 
    const id = req.params.id ;
    try{
        book = await Book.findById(id);
    }catch(err) {
        console.log(err);
    }
    if(!book){
        return res.status(404).json({message : "No book found"})
    }
    return res.status(200).json({book});
}

const updateBook = async(req, res) => {
    const id = req.params.id ;
    let book ;
    // const {name , author , description , price , available , image } = req.body ;
    try{
        book = await Book.findByIdAndUpdate(id,{
            name : req.body.name, 
            author : req.body.author,
            description : req.body.description , 
            price  : req.body.price, 
            available : req.body.available, 
            image : req.body.image
        });
        await book.save();
    }catch(err){
        console.log(err);
    }
    if(!book){
        return res.status(404).json({message : "Unable to update "});
    }
    return res.status(200).json({book});
}
const deleteBook = async (req, res) => {
    const id = req.params.id ;
    let book ;
    // const {name , author , description , price , available , image } = req.body ;
    try{
        book = await Book.findByIdAndRemove(id);
    }catch(err){
        console.log(err);
    }
    if(!book){
        return res.status(404).json({message : "Unable to delete "});
    }
    return res.status(200).json({message : "Product successfully deleted "});
}
exports.getAllBooks = getAllBooks ; 
exports.addBook = addBook ;
exports.getById = getById ;
exports.updateBook = updateBook ; 
exports.deleteBook = deleteBook ;