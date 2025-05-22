//imports
import { appendFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import express, { json } from 'express';
//porta do servidor
const PORTA = 8080

const server = express()
server.use(json())

server.options('/', (req, res)=>{
    res.status(200).json({msg:"Tudo Ok"})
})
// função de caminho e conteudo para o usar no log
function anexarConteudo(caminho, conteudo) {
  return new Promise((resolve, reject) => {
    appendFile(caminho, conteudo, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
// adicionar o caminho do log e o conteudo para aparecer no log
async function anexarAoArquivo() {
  const caminhoDoArquivo = 'logs.txt';
  const IdAleatorio = uuidv4().toString();
  const data = new Date();
  const aluno = "Enzo";
  const resposta = `\nId: ${IdAleatorio}, Data: ${data}, Nome: ${aluno} `
// adicionar o conteudo no log
  try {
    await anexarConteudo(caminhoDoArquivo, resposta);
    console.log('Conteúdo anexado com sucesso!');
  } catch (erro) {
    console.error('Erro ao anexar conteúdo:', erro);
  }
  console.log(resposta)
}
// Funcionando parcialmente 
anexarAoArquivo();
server.post('/logs', (req, res) => {
  const {nome_aluno} = req.body
      if(!nome_aluno){
          return res.status(400).json({erro: 'Você não colocou um nome!'})
      }
      const idGerado = adicionarMensagem(nome_aluno)
          res.status(200).json({mensagem: 'Log salvo', id: idGerado})
})

//abrir a porta
server.listen(PORTA, () => {
    console.log('Servidor rodando na porta 8080')
})