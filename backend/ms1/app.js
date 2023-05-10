import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import { translate } from 'free-translate'; 
//setting up the server and importing my modules & routes

const app = express();
app.use(cors())
app.use(bodyParser.json());
const port = 3000;
app.listen(port, () => {
  console.log(
    `server started at http://localhost:${port}`
  );
});
 let translation;
app.post('/data', async (req, res) => {
  const translatedText = await translate(req.body.text, { from: 'en', to: req.body.lang });
  translation = translatedText

  console.log(translatedText); 
  res.send({"text": translatedText});
})

app.get('/translated',(req,res) => {
  res.send({"text": translation});
  console.log(translation)
});


export default app;