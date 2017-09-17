var bcrypt = require('bcrypt');
const saltRounds = 10;

hash_passwd = (passwd)=>{
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(passwd, salt);

    return hash;
}

compare_passwd = (myPlaintextPassword, hash)=>{
    return bcrypt.compareSync(myPlaintextPassword, hash);
}
module.exports = {
    hash_passwd: hash_passwd,
    compare_passwd: compare_passwd
}