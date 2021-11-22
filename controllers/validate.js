const Joi = require("joi"); //Tem que ser validado o dado que está sendo enviado pelo usuário e não no momento que está sendo gravado no DB. O Joi resolve este tipo de problema. Ou seja, tem que ser validado no momento que os dados cehga no Backend e não no momento que está sendo gravado.

validate = {
    registerValidate(data){ //Enviando os dados como argumentos
        const schema = Joi.object({ //Criação do schema(onde irá funcionar somente dentro desta função) onde estará validando as informações enviadas.
            name: Joi.string().required().min(3). max(50), //modo de tratamento feito no Joi
            email: Joi.string().required().min(3). max(100).lowercase(),
            password: Joi.string().required().min(3). max(50),
            admin: Joi.boolean().default(false)
        })
        return schema.validate(data); //Retornando a validação do schema dos dados(data)
    },

    loginValidate(data){
        const schema = Joi.object({
            email: Joi.string().required().min(3). max(100).lowercase(),
            password: Joi.string().required().min(3). max(50),
        })
        return schema.validate(data);
    }
}

module.exports = validate;