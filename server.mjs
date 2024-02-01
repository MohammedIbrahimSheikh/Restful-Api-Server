import express from 'express'
import cors from 'cors';
import { nanoid } from 'nanoid';
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


app.get('/user/:userId',(req,res)=>{
  let userId = req.params.userId;
  let isFound = false;
  for (let i = 0; i < users.length; i++) {
    if (userId == users[i].Id){
      isFound = true;
      res.send(users[i]);
      break;
    }
  }
  if (!isFound) res.send("User doesn't exist !");
})

app.get('/users',(req,res) => res.send(users));

app.post('/user',(req,res)=>{
  users.push(req.body);
  users[(users.length - 1)].Id = nanoid();
  res.send("Congrats! User has been Created");
})

app.put('/user/:userId',(req,res) => {
  let userId = req.params.userId;
  let isFound = false;
  // console.log( usersId , isFound);
  for (let i = 0; i < users.length; i++) {
    if (userId == users[i].Id) {

      isFound = true;

      if(req.body.firstname) users[i].firstname = req.body.firstname;

      if(req.body.lastname) users[i].lastname = req.body.lastname;

      if(req.body.email) users[i].email = req.body.email;

      if(req.body.password) users[i].password = req.body.password;

      res.send("Congrats! User has been updated.");
      break;
    }
  }
  if(!isFound) res.send("User doesn't exist !");
})

app.delete('/user/:userId',(req,res) => {

  let userId = req.params.userId ; 
  let isFound = false;
  for (let i = 0; i < users.length; i++) {
    if (userId == users[i].Id) {
     users.splice(i,1);
      res.send("User has been deleted!");
      break;
    }
  }
  if(!isFound) res.send("User doesn't exist !");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})