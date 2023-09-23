import React from 'react'
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced'
import Header from '../customHeader'
import StandardMessageForm from '../customMessageForms/StandardMessageForm'
import Ai from '../customMessageForms/Ai'
import AiCode from '../customMessageForms/AiCode'

const Chat = () => {

  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    "testuser",
    "123"
  )
  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} /> {/* this renders the component and gives authentication to chatengine */}
      <MultiChatWindow 
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {

          if(chatProps.chat?.title.startsWith("AiChat_")) {
            return <Ai props={props} activeChat={chatProps.chat} />
          }
          if(chatProps.chat?.title.startsWith("AiCode_")) {
            return <AiCode props={props} activeChat={chatProps.chat} />
          }
          return (
            <StandardMessageForm props={props} activeChat = {chatProps.chat} />
          )
        }}
      />
    </div>
  )
}

export default Chat