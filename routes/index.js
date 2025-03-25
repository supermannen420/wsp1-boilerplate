import express from "express"
import bcrypt from "bcrypt"
import pool from "../db.js"
import bodyParser from "body-parser"
import { compare } from "bcrypt"


const router = express.Router()



router.get("/", async (req, res) => {
    if (req.session.views) {
      req.session.views++
    } else {
      req.session.views = 1
    }
    res.render("index.njk",
      { title: "Test", message: "Funkar?", views: req.session.views }
    )
  })

router.get("/login", async(req, res) => {
  res.render("login.njk")
})

router.get("/logedin", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login"); // Skicka tillbaka till login om inte inloggad
  }
  res.render("logedin.njk", { titel: "Inloggad", message: "Du är inloggad" });
});




router.post("/login", async(req,res) => {
  const username = req.body.username
  const password = req.body.password

  console.log(req.body)
  const [rows] = await pool
  .promise()
    .query("SELECT * FROM user WHERE username = ?", [ 
      username
    ]);
  

  
  if (rows.length > 0) {
    const DATABASE_PASSWORD = rows[0].password;
    bcrypt.compare(password, DATABASE_PASSWORD).then(function(result) {
      if (result) {
        console.log("Allt stämmer!") 
        req.session.user = username;
        res.redirect("/logedin")
      }else {
        console.log("lösenord eller andvändarnamn hittas inte");

      }
       
    });
  } else {
    console.log("lösenord eller andvändarnamn hittas inte");
  }
})


export default router;

