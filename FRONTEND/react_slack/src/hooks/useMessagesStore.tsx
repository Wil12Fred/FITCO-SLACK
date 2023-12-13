import { useState } from "react";
import { useDispatch } from "react-redux";
import { AdminService } from "src/config/dataService/adminService";
import { ApiRoutes } from "src/utility/apiRoutes";

export const useMessagesStore = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const get_channel_messages = async (channelId: number) => {
    try {
      const data = (await AdminService.get<any>(
        ApiRoutes.createAPIRouteDetail(ApiRoutes.admin.channel, channelId.toString()),
      )).data;
      const channelMessages = data.channelMessages.map((channelMessage: any) => {
        console.log(channelMessage);
        return {
          messageId: channelMessage.message.messageId,
          channelId: channelMessage.channelId,
          text: channelMessage.message.text,
          username: channelMessage.message.username,
        }
      });
      setMessages(channelMessages);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return { messages, get_channel_messages, setMessages };
};
