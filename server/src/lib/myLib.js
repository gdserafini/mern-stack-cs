import bcrypt from 'bcrypt';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const validEmail = function(email){
    return (email === 'admin@admin.com' || 
        emailRegex.test(email));
};

const validPassword = async function(password){
    const adminPassword = await bcrypt.hash(
        process.env.DEFAULT_ADMIN_PASSWORD,
        await bcrypt.genSalt()
    );

    return (bcrypt.compareSync(password, adminPassword) || 
        passwordRegex.test(password));
};

export const invalidFields = function(fields=[]){
    return fields.some(
        (f) => f !== 'password' && f !== 'name' && 
            f!== 'avatar' && f !== 'background'
    );
};

export const missingFieldsCreate = function(body){
    const {name, username, password, 
        email, avatar, background} = body;

    if(!name || !username || !password ||
        !email || !avatar || !background){

            return true;
        }

    return false;
};

export default {
    validEmail, validPassword, invalidFields,
    missingFieldsCreate
};