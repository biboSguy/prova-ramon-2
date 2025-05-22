const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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
  const data = Date.now().toString();
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