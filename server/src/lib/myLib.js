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

export default {
    validEmail, validPassword
};