const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.static('uploads')); // Para servir os arquivos salvos

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
  }
});

const upload = multer({ storage: storage });

// Rota para receber o upload de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }
  res.send({
    message: 'Arquivo salvo com sucesso!',
    filePath: `http://localhost:3200/${req.file.filename}` // Caminho para acessar o arquivo
  });
});

const port = 3200;
app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});