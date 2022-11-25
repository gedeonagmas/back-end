const feedbackModel=require('./../backend/models/feedbackModel');

const feedbackPostHandler=async (req,res)=>{
   try{
    const data=await feedbackModel.create({
        name:req.body.name,
        email:req.body.email,
        feedback:req.body.feedback,
        date:req.body.date,
    });
    res.status(201).send(data);
   }catch(err){
    res.status(500).send(err.message);
   }
}

const feedbackGetHandler=async (req,res)=>{
try{
    const data=await feedbackModel.find();
    res.status(200).send(data);
}catch(err){
    res.status(500).send(err.message);
}
}

module.exports={feedbackPostHandler,feedbackGetHandler};