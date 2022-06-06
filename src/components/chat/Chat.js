import TopPanel from "./topPanel/TopPanel";
import ChatInput from "./chatInput/ChatInput";
import ChatContent from "./chatContent/ChatContent";
import { db } from "../../firebase";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Chat = () => {
  const { chatId } = useParams();
  const [chatData, setChatData] = useState({});

  const findChat = async () => {
    const chatDocRef = doc(db, "chats", chatId);

    const chatDocSnap = await getDoc(chatDocRef);

    setChatData(chatDocSnap.data());
  };

  useEffect(() => {
    findChat();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  return (
    <Box
      backgroundColor="bgPrimary.main"
      display="flex"
      flexDirection="column"
      flex="1"
      height="100vh"
    >
      {Object.keys(chatData).length > 0 ? (
        <>
          <TopPanel chatId={chatId} chatData={chatData} />
          <ChatContent chatId={chatId} />
          <ChatInput chatId={chatId} chatData={chatData} />
        </>
      ) : null}
    </Box>
  );
};

export default Chat;
