import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
        res.status(201).json({"message": "User created successfully"});
    }catch(err) {
        console.log(err);
        res.status(500).send("Failed to create user");
    }
};

export const login = async (req, res)=> {
    const {username, password} = req.body;
    //db Operations
    try{
    //Check if the user exists
        const user = await prisma.user.findUnique({
            where: {username},
        });
        if(!user) return res.status(401).send({message: "Invalid credentials"});

    //Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(400).json({ message: "Invalid Credentials!" });

    //Generate cookie token and send to the user
        // res.setHeader("Set-Cookie", "test=" + "myValue").json("success");
        const age = 1000 * 60 * 60 * 24 * 7;
        const token = jwt.sign(
            {
              id: user.id,
            //   isAdmin: false,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
          );

        res.cookie("token", token, {
                httpOnly: true,
                // secure:true, should be true for production
                maxAge: age, // Sets the cookie expiry to 1 week
            })
            .status(200)
            .json({message: "Login successful"});


    }catch(err) {
        console.log(err);
        res.status(500).send("Failed to create user");
    }
};

export const logout = (req, res)=> {
    //db Operations
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};