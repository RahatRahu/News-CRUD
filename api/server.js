require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 3001;
const mysql = require("mysql2");
let cors = require("cors");
app.use(cors());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "15052000",
  database: "user",
  port: "3307",
});

app.use(express.json());

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});

//get all posts
app.get("/blogposts", (req, res) => {
  connection.query(
    "select userName, blogNumber ,blogTitle, blogPost from userinfo, blog_posts where userinfo.userId=blog_posts.userId",
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

//show specific post
app.get("/post/:id", (req, res) => {
  connection.query(
    `select userName, blogTitle, blogPost from userinfo, blog_posts where userinfo.userId=blog_posts.userId and blogNumber=?`,
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.post("/signup", (req, res) => {
  let { userName, FullName, userEmail, password } = req.body;
  let sql =
    "insert into userinfo (userName , FullName , userEmail, password) values (?,?,?,?)";
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      password = hash;
      // console.log(password);
      connection.query(
        sql,
        [userName, FullName, userEmail, password],
        (err, rows, fields) => {
          if (err) {
            console.log(err);
          } else {
            res.send("signup successfull");
          }
        }
      );
    });
  });
  // connection.query(sql,[userName , FullName , userEmail , password], (err, results, fields) => {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         res.send("sign up successfull");
  //     }
  // });
});

app.post("/login", (req, res) => {
  let { userEmail, password } = req.body;
  let sql = "select * from userinfo where userEmail = ?";
  connection.query(sql, [userEmail], (err, results, fields) => {
    if (err) {
      console.log(err);
    } else if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, result) => {
        if (err) {
          console.log(err);
        } else if (result) {
          const userId = results[0].userId;
          const user = { id: userId };
          // console.log(user);
          const token = jwt.sign(user, process.env.JWT_KEY);
          res.json({ token: token, user: "login successfull" });
          // if(bcrypt.compare(password, results[0].password)){
          // res.json({token: token, user: "login successfull"});
          // }
          // else {
          //   res.json({user: "password is incorrect"});
          // }
        } else {
          res.json({ user: "password is incorrect" });
        }
      });
    }
  });
});

//first 2 lines for postman
function authenticateToken(req, res, next) {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  const token = req.headers["x-access-token"];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.use(authenticateToken);

app.get("/getuser", (req, res) => {
  const userId = req.user.id;
  const sql = "select * from userinfo where userId = ?";
  connection.query(sql, [userId], (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

//post a new post
app.post("/postblog", (req, res) => {
  const { blogTitle, blogPost } = req.body;
  const { id } = req.user;
  console.log(id);
  let sql =
    "insert into blog_posts (userID, blogTitle, blogPost) values (?,?,?)";
  connection.query(sql, [id, blogTitle, blogPost], (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.send("blog post successfull");
    }
  });
});

//edit a post
app.put("/updatepost/:blogNumber", (req, res) => {
  console.log(req.body);
  const { id } = req.user;
  const postNo = req.params.blogNumber;
  console.log(id);
  console.log(postNo);
  const {  blogTitle, blogPost } = req.body;
  let sql =
    "update blog_posts set blogTitle = ?, blogPost = ? where userId=? and blogNumber=?";
    connection.query(
      sql,
      [blogTitle, blogPost, id, req.params.blogNumber],
      (err, results, fields) => {
        if (err) {
          console.log(err);
        } else {
          res.send("blog post updated");

        }
      }
    );
});

app.delete("/deletepost/:blogNumber", (req, res) => {
  const { id } = req.user;
  console.log(id);
  let sql = "delete from blog_posts where userId = ? and blogNumber = ?";

  connection.query(sql, [id, req.params.blogNumber], (err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.send(posts);
    }
  });
});

app.put("/updateusername", (req, res) => {
  const { userName } = req.body;
  const { id } = req.user;
  let sql = "update userinfo set userName = ? where userID = ?";
  connection.query(sql, [userName, id], (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.send("username updated");
    }
  });
});

app.put("/updatefullname", (req, res) => {
  const { FullName } = req.body;
  const { id } = req.user;
  let sql = "update userinfo set FullName = ? where userID = ?";
  connection.query(sql, [FullName, id], (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.send("fullname updated");
    }
  });
});

app.put("/updateemail", (req, res) => {
  const { userEmail } = req.body;
  const { id } = req.user;
  let sql = "update userinfo set userEmail = ? where userID = ?";
  connection.query(sql, [userEmail, id], (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.send("email updated");
    }
  });
});

app.put("/updatepassword", (req, res) => {
  let { password } = req.body;
  const { id } = req.user;
  let sql = "update userinfo set password = ? where userID = ?";
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      password = hash;
      connection.query(sql, [password, id], (err, results, fields) => {
        if (err) {
          console.log(err);
        } else {
          res.send("password updated");
        }
      });
    });
  });
});

app.get("/users", (req, res) => {
  connection.query("select * from userinfo", (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

//get all post of a user
app.get("/userposts", (req, res) => {
  const { id } = req.user;
  const { userName } = req.query;
  connection.query(
    "select * from blog_posts where userID = ?",
    [id],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
