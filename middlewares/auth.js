const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{

    const token = req.header("authorization");

    if(!token){ //Se não existir o header..
        res.status(401).send("Acess Denied"); // ..acesso negado
    } else{
        try {
            const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET); //Verificando a autenticação do TOKEN.

                req.user = verifyToken; //Pegando esse conteúdo da const verifyToken e colocando dentro da req(requisição) para ir para a próxima função, agora estamos no middleware de autenticação mas o código vai continuar e ir para o controlador, adicionando o conteúdo de verifyToken na req conseguimos ter acesso a ele depois lá na frente
                next();  //req.user colocando no next()             
        } 
        catch (error) {
            res.status(401).send("Acess Denied on catch");
        }
    }

}