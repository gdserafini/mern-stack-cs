const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const validEmail = function(email){
    return (email === 'admin@admin.com' || 
        emailRegex.test(email));
};

const validPassword = function(password){
    return (password === 'admin' || 
        passwordRegex.test(password));
};

export default {
    validEmail, validPassword
};