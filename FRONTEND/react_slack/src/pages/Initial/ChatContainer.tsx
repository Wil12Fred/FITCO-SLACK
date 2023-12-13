import { FC, useEffect, useState } from "react";
import { Card, Form, Input } from "reactstrap";
import { MessageItem } from "src/components/MessageItem/MessageItem";
import { useAdminStore } from "src/hooks/useAdminStore";
import { useFormUpdate } from "src/hooks/useFormUpdate";
import { ChannelMenu } from "./ChannelMenu";
import { useMessagesStore } from "src/hooks/useMessagesStore";
import { chatClient } from "src/socket/chatSocket";

export const ChatContainer: FC<any> = ({
  channel,
}) => {
  const { messages, get_channel_messages, setMessages } = useMessagesStore();
  const [initialForm, setInitialForm] = useState({
    text: "",
  });
  const { sendMessage } = useAdminStore();
  const {
    onInputChange,
    text,
  } = useFormUpdate(
    initialForm,
  );
  function handleSubmit(e: any) {
    e.preventDefault();
    sendMessage(channel.channelId, {
      text,
    });
    setInitialForm({
      text: "",
    });
  }
  const handle_get_channel_messages = async () => {
    await get_channel_messages(channel.channelId);
  }
  useEffect(() => {
    console.log(messages);
    if (chatClient.socket) {
      chatClient.socket.on("message", (msg: any) => {
        if (channel.channelId == msg.channelId) {
          const newList = messages.concat(msg);
          setMessages(newList);
        }
      });
      return () => {
        chatClient.socket.off('message');
      };
    }
  }, [messages]);
  useEffect(() => {
    handle_get_channel_messages();
  }, [channel]);
  return (
    <>
      <div className="p-1 border-bottom">
        <div className="row">
          <div className="col-xl-4 col-7">
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <ChannelMenu name={channel?.name ?? ''}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card>
        <div></div>
        <div>
          <div className="chat-conversation p-3" data-simplebar="init">
            <div className="simplebar-wrapper" style={{ margin: "-16px" }}>
              <div className="simplebar-mask">
                <div className="simplebar-offset" style={{ right: "-20px", bottom: "0px" }}>
                  <div style={{ height: "100%", paddingRight: "20px", paddingBottom: "0px", overflow: "hidden scroll" }}>
                    <div className="simplebar-content" style={{ padding: "16px" }}>
                      <ul className="list-unstyled mb-0">
                        {messages.map(((item: any) => <MessageItem message={item} />))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="simplebar-track simplebar-horizontal" style={{ visibility: "hidden" }}>
              <div className="simplebar-scrollbar" style={{ transform: "translate3d(0px, 0px, 0px)", display: "none" }}>
              </div>
            </div>
            <div className="simplebar-track simplebar-vertical" style={{ visibility: "visible" }}>
              <div className="simplebar-scrollbar" style={{ height: "188px", transform: "translate3d(0px, 55px, 0px)", display: "block" }}>
              </div>
            </div>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="p-3 chat-input-section">
            <div className="row">
              <div className="col">
                <div className="position-relative">
                  <Input type="text" name="text" value={text} onChange={onInputChange} className="form-control chat-input" placeholder="Enter Message...">
                  </Input>
                </div>
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary chat-send w-md">
                  <span className="d-none d-sm-inline-block me-2">Send</span>
                  <i className="mdi mdi-send float-end"></i></button>
              </div>
            </div>
          </div>
        </Form>
      </Card>
    </>
  );
};
