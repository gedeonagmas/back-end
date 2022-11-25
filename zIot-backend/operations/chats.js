const chatsModel = require("../backend/models/chatsModel");
const chatsHandler = async (req, res) => {
  try {
    const data = await chatsModel.create({
      chatOwners: req.body.chatOwners,
      chatId: req.body.chatId,
      messages: req.body.messages,
      chatType: req.body.chatType,
    });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
// ################################ get private chat handler ######################
const getPrivateChatHandler = async (req, res) => {
  try {
    const data = await chatsModel.find({ chatId: req.query.ids });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//################################# update private chate handler #######################
const updatePrivateChatHandler = async (req, res) => {
  try {
    const data = await chatsModel.updateOne(
      { chatId: req.query.ids },
      {
        $set: {
          chatOwners: req.body.chatOwners,
          chatId: req.body.chatId,
          messages: req.body.messages,
          chatType: req.body.chatType,
        },
      }
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  chatsHandler,
  getPrivateChatHandler,
  updatePrivateChatHandler,
};
