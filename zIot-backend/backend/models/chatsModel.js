const mongoose = require("../mongodb");

const chatsModel = mongoose.Schema(
  {
    chatOwners: {
      type: String,
    },
    chatId: {
      type: String,
    },
    messages: {
      type: [Object],
    },
    chatType: {
      type: String,
    },
  },
  { timestamps: true }
);
const chats = mongoose.model("chats", chatsModel);

module.exports = chats;
