const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Configuração do multer para salvar os arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
  }
});

const upload = multer({ storage: storage });

app.use(express.static('uploads')); // Para servir os arquivos salvos

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Rota para receber o upload de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }
  res.send({
    message: 'Arquivo salvo com sucesso!',
    filePath: `http://localhost:3000/${req.file.filename}` // Caminho para acessar o arquivo
  });
});

app.listen(3200, () => {
  console.log('Servidor rodando na porta 3000');
});
