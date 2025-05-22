const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const server = express()
server.use(express.json())

server.options('/', (req, res)=>{
    res.status(200).json({msg:"Tudo Ok"})
})
server.get('/tarefas', (req, res)=> {
    fs.readFile('./banco.json', 'utf-8', (err, data) =>{
        if(err){
            res.status(500).json({erro:err})
        } else {
            const tarefas = JSON.parse(data)
            res.status(200).json(tarefas)
        }
    })
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

server.listen(8000, () => {
    console.log('Servidor rodando na porta 8000')
})