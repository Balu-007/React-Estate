import bcrypt from "bcrypt";

export const register = async (req, res)=> {
    const { username, email, password } = req.body;
    
    //Hash the password by using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword);
    //Create new user in DB


};

export const login = (req, res)=> {
    //db Operations
};

export const logout = (req, res)=> {
    //db Operations
};