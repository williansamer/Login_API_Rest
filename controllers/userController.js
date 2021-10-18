const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
    register: async (req, res)=>{
        const {email} = req.body;
        try {
            if(await User.findOne({email})){
                res.status(400).send("Email already exist");
            } else{
                const saveUser = await User.create(req.body);   // Forma usada para criar e salvar. Tudo em uma só linha
                res.send(saveUser);
            }
        } 
        catch (error) {
            //console.log(error)
            res.status(400).send({error: "Error when register the email"})
        }
    },
    login: async (req, res)=>{
        const {id, email, password, admin} = req.body;
        try {
            const user = await User.findOne({email}) //Procura o email que está sendo digitado no body lá no DB. Como é o mesmo nome, então pode colocar somente '{email}', senão colocaria, por ex: '{email: req.body.email}'
            if(!user){
                res.status(400).send("Email incorrect");
            } else if(!await bcrypt.compare(password, user.password)){
                res.status(400).send("Password incorrect");
            } else{
                const token = jwt.sign({id: user._id, admin: user.admin}, process.env.TOKEN_SECRET); //Definir exatamente como objeto(com chave e valor), para que ao ser verificado, ele mostre os campos(neste caso o 'id' e 'admin') para ser manipulados a frente(neste caso, no 'adminRouter')

                user.password = undefined;
                res.header("authorization", token); //Definido o Header 'authorization' que é o token, ou seja, enviando para o header o token
                res.send(user);
            }
        } 
        catch (error) {
            console.log(error)
            res.status(400).send({error: "Login error"})
        }
    }
}

module.exports = userController;


//_____________________As linhas abaixo é outra forma de criar um usuário..

//const user = new User({name: req.body.name, 
//                       email: req.body.email, 
//                       password: req.body.password})   

//const saveUser = await user.save();           // Após criar, salvar.
//__________________________________________________________________________________________


