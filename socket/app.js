import { Server } from "socket.io";

const io = new Server({
    cors: {
        // origin: "http://localhost:5173",
        origin: "https://react-estate-sigma.vercel.app",
        // origin: "*",
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
    },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
    const userExits = onlineUser.find((user) => user.userId === userId);
    if (!userExits) {
      onlineUser.push({ userId, socketId });
    }
};

const removeUser = (socketId) => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket)=> {
    // console.log(socket.id);
    socket.on("newUser", (userId) => {
        addUser(userId, socket.id);
        console.log(onlineUser);
    });

    socket.on("sendMessage", ({receiverId, data})=> {
        // console.log(receiverId);
        // console.log(data);
        const receiver = getUser(receiverId);
        io.to(receiver.socketId).emit("getMessage", data);
    })

    socket.on("disconnect", () => {
        removeUser(socket.id);
    });
})

io.listen("4000", ()=> {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
});
