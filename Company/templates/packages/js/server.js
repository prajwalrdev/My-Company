import express from 'express';
import path from 'path'; // Ensure 'path' is lowercase
import multer from 'multer'; // Importing multer using 'import'
import { mergePdfs } from './merge.js'; // Import the mergePdfs function correctly
import { fileURLToPath } from 'url'; // Required to handle ES modules with __dirname

// Convert __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use('/static', express.static('public'));
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html")); // Use 'path' instead of 'Path'
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  console.log(req.files);
  await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
  res.redirect("http://localhost:3000/static/merged.pdf"); // Redirect after merge
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
