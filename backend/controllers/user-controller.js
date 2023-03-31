const User = require("../model/User");

const findUser = async (req, res) => {
    let user ;
    const name = req.params.name;
    try{
        user = await User.find({name: name});
    }catch(err) {
        console.log(err);
    }
    if(user){
        return res.status(404).json({message : "User already exists with that name"})
    }
}
const addUser = async (req, res) => {
    let user ;
    console.log(req.body);
    // console.log(req.body.password);
    // const {name , author , description , price , available , image } = req.body ;
    try{
        user = new User({
            name : req.body.username, 
            password : req.body.password
        });
        await user.save();
    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(500).json({message : "Unable to Register "});
    }
    return res.status(201).json({user});
}

const getUser = async (req, res) => {
    let user ; 
    const email = req.params.email;
    console.log(req.body);
    // console.log(req.body.username);
    // console.log(req.body.password);
    try{
        user = await User.find({name: email});
    }catch(err) {
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message : "No User found"})
    }
    return res.status(200).json({user});
}

exports.getUser = getUser ; 
exports.findUser = findUser ;  
exports.addUser = addUser ;