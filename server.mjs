import express from 'express'
import cors from 'cors';
const app = express()

app.use(cors()); // have got to cover later

app.use(express.json()); // decript the body of response

const port =process.env.PORT || 3000 ; // searches an available port at heroku 

// alternate way of line 9!
// let port = null;
// if (process.env.PORT){
//   port = process.env.PORT;
// }else{
//   port = 3000;
// }

let users =[];

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/user',(req,res)=>{
  users.push(req.body);
  console.log("post ke request",req.body);
  res.send("Congrats! User has been Created");
})

app.get('/user',(req,res)=>{
  res.send(users);
  console.log("get ke request",req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})