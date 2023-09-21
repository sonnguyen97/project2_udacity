import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';
import jwt from 'jsonwebtoken';
const secretKey = '123456789'; // Replace with a strong and secret key

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

    /**************************************************************************** */
    app.get( "/filteredimage", async (req, res) => {
      let image_url = req.query.image_url;
      let file = await filterImageFromURL(image_url).catch(err => {
        res.status(404).send("Image Url Not Found");
      })
      res.status(200).sendFile(file, () => {
        deleteLocalFiles([file]);
      });
    });
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  
  
  // app.get( "/", verifyToken , async (req, res) => {
  //   res.send("try GET /filteredimage?image_url={{}}")
  // } );
  // function verifyToken(req, res, next) {
  //   const token = req.header('Authorization');
  
  //   if (!token) {
  //     return res.status(401).json({ message: 'Unauthorized' });
  //   }
  
  //   try {
  //     const decoded = jwt.verify(token, secretKey);
  //     req.user = decoded;
  //     next();
  //   } catch (err) {
  //     return res.status(401).json({ message: 'Invalid token' });
  //   }
  // }


  // app.post('/login', (req, res) => {
  //   const { username, password } = req.body;
  
  //   // You can replace this with your own authentication logic
  //   if (username === 'user' && password === 'password') {
  //     const payload = {
  //       username: username,
  //     };
  
  //     const token = jwt.sign(payload, secretKey);
  
  //     res.json({ token });
  //   } else {
  //     res.status(401).json({ message: 'Authentication failed' });
  //   }
  // });



  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
