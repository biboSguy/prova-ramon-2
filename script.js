const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const express = require('express')

const server = express()
server.use(express.json())

server.options('/', (req, res)=>{
    res.status(200).json({msg:"Tudo Ok"})
})

function anexarConteudo(caminho, conteudo) {
  return new Promise((resolve, reject) => {
    fs.appendFile(caminho, conteudo, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function anexarAoArquivo() {
  const caminhoDoArquivo = 'logs.txt';
  const IdAleatorio = uuidv4().toString();
  const data = new Date();
  const aluno = "Enzo";
  const resposta = `\nId: ${IdAleatorio}, Data: ${data}, Nome: ${aluno} `

  try {
    await anexarConteudo(caminhoDoArquivo, resposta);
    console.log('Conteúdo anexado com sucesso!');
  } catch (erro) {
    console.error('Erro ao anexar conteúdo:', erro);
  }
  console.log(resposta)
}

anexarAoArquivo();

server.listen(8000, () => {
    console.log('Servidor rodando na porta 8000')
})