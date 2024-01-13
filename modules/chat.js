const mongoose = require("mongoose");

const chatData = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "A user must have a name"],
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        }
    },
    { collection: "messages" }
);

const Chat = mongoose.model("Chat", chatData);

const saveMessage = async (message) => {
    try {
        const newMessage = new Chat(message);
        await newMessage.save();
        console.log('Message saved to the database:', message);
    } catch (error) {
        console.error('Error saving message to the database:', error.message);
    }
};

module.exports = { Chat, saveMessage };