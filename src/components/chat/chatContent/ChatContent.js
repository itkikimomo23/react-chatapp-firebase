import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import Message from "./Message";
import { StyledChatContent } from "./styles";

const ChatContent = ({ chatId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribeMessages = subscribeMessages();

    return () => {
      unsubscribeMessages();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  const subscribeMessages = () => {
    const recentMessagesQuery = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("sentAt", "desc"),
      limit(12)
    );

    return onSnapshot(recentMessagesQuery, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });
  };

  return (
    <StyledChatContent>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </StyledChatContent>
  );
};

export default ChatContent;