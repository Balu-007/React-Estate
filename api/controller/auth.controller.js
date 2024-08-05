import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res)=> {
    const { username, email, password } = req.body;
    
    try{
        //Hash the password by using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword);
        //Create new user in DB
        const newuser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            },
        });
        console.log(newuser);
        res.status(201).json({message: "User created successfully"});
    }catch(err) {
        console.log(err);
        res.status(500).send("Failed to create user");
    }
};

export const login = (req, res)=> {
    //db Operations
};

export const logout = (req, res)=> {
    //db Operations
};