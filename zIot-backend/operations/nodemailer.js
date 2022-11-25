const nodemailer=require('nodemailer');



// from:'gedonagmas2580@gmail.com',datas.from,
//   to:'wkibrebal2426@gmail.com',
//   subject:'from iot lab center cc',
//   text:'we realy so sorry currently we are out of space so please cheack another organizations'

const email=(datas)=>{
  const mailTransporter=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'gedeonagmas2580@gmail.com',
    pass:'zmzknjsvgarjqliv'
  }
});
  let details={
  from:'debretabour university IoT lab center',
  to:datas.to,
  subject:datas.subject,
  text:datas.text,
};

mailTransporter.sendMail(details,(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('successfull email sent');
  }
});
}

module.exports=email;