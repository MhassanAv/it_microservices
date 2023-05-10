import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import PDFDocument from 'pdfkit'
import axios from 'axios';
import fs from 'fs';
import open from 'open';
//setting up the server and importing my modules & routes

const app = express();
app.use(cors())
app.use(bodyParser.json());
const port = 4000;
app.listen(port, () => {
  console.log(
    `server started at http://localhost:${port}`
  );
});
 


app.get('/pdf', async (req, res) => {
  const translation = await axios.get('http://localhost:3000/translated')
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('translated.pdf'));
  doc.pipe(res)
  doc
  .fontSize(20)
  .text(translation.data.text);
  doc.end();
  open('translated.pdf')
})


export default app;