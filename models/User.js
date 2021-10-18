const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50},
    email: {type: String, required: true, unique: true, minlength: 6, maxlength: 100, lowercase: true},
    password: {type: String, required: true, minlength: 6, maxlength: 50},
    admin: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

userSchema.pre("save", async function(next){ // antes de('pre')...salvar('save'), execute esta função..
    const hash = await bcrypt.hash(this.password, 10) // encrypta('bcrypt') por hash('hash') o password('this.password'). Basicamente a variável hash está recebendo um hash do password
    this.password = hash; // O password do DB('this.password') receberá o hash. Só aqui que o password recebe o hash. Senão, no DB não estaria encrypitado.
    next(); // Depois disso, passe adiante..
})

const User = mongoose.model("User", userSchema);

module.exports = User;

