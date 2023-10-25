const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{
    let validusers = users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
  }

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
   if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
  
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const review = req.params.isbn;
    let book = books[review]
    if (book) { //Check is friend exists
        let DOB = req.body.DOB;
        //Add similarly for firstName
        //Add similarly for lastName
        //if DOB the DOB has been changed, update the DOB 
        if(DOB) {
            book["DOB"] = DOB
        }
        //Add similarly for firstName
        //Add similarly for lastName
        books[review]=book;
        res.send(`Book with the review ${review} updated.`);
    }
    else{
        res.send("Unable to find book!");
    }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const usern = req.session.username
    const isbn = req.params.isbn;
    let book = books[isbn]
    if (book && usern === book.user){
        delete friends[email]
    }
    res.send(`Review of the book ${book} deleted.`);
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
