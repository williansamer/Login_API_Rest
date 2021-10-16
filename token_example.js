//TOKEN é uma chave criada pelo 'JWT' para validar o acesso ao usuário em cada aplicação feita pelo FRONT.
//O TOKEN é formado em duas partes..
//               O 'PAYLOAD', ou seja, credenciais únicas de cada documento(geralmente é o 'ID')
//               Um 'SECRET', ou seja, um segredo que somente o BAKEND sabe. Pode ser uma chave totalmente aleatória que é armazenada nas variáveis de ambiente(pasta config, por ex).
//OBS: Antes de todo TOKEN, vem a palavra "Bearer" seguido de um espaço.

//https:jwt.io

const jwt = require("jsonwebtoken"); //requisitando o pct jwt

const secret = "3reeadnawr44wr4wr4wreadf4";  //Gerando uma chave(secret/segredo) aleatório

createToken(); // Chamando a função createToken
//verifyToken("digite o token aqui"); // Chamando a função verifyToken() e como argumento o token que foi gerado quando executou o createToken()

function createToken(){
    const user = {
        id: 90,
        name: "José",
        email: "jose@gmail.com",
        password: "123456"
    }

    const token = jwt.sign({id: user.id, email: user.email}, secret, {expiresIn: 90});
    //sign: Para gerar um token
    //1ª parte: payload({id: user.id, email: user.email}). Está usando aqui o id+email. Mas poderia ser um só.
    //2ª parte: secret/segredo que é uma string
    //3ª parte: obj expiresIn. É o tempo para ser expirado a chave Token. Neste caso, 90 segundos

    console.log(token); //Imprimindo o token
}

function verifyToken(token){

    const verifyToken = jwt.verify(token, secret);
    // verify: Verificando se o token é válido.
    //1º - token: 1ª parte do token
    //2º - secret: 2ª parte do token

    console.log(verifyToken);

}