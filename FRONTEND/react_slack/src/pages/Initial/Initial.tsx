import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useWorkspaceStore } from "src/hooks/useWorkspaceStore";
import { Button, Card, Container } from "reactstrap";
import useModal from "src/hooks/useModal";
import { ChannelCardContainer } from "./ChannelCardContainer";
import { ChannelModal } from "./ChannelModal";
import { ChatContainer } from "./ChatContainer";
import { WorkspaceMenu } from "./WorkspaceMenu";
import { chatClient } from "src/socket/chatSocket";

export const Initial = () => {
  const { workspace, channel, get_workspace, set_channel } = useWorkspaceStore();
  const [isOpenModalAddChannel, openModalAddChannel, closeModalAddChannel]: any = useModal(false);
  const {
    userData,
  } = useSelector((state: any) => {
    return {
      userData: state.userData,
    }
  });
  const handle_set_channel = async (currentState: any, channel: any) => {
    chatClient.registerRoom(channel.channelId);
    set_channel(currentState, channel);
  }
  const handle_get_workspace = async () => {
    const data = await get_workspace(userData.workspace?.workspaceId);
    if (userData && !userData.channel && data?.channels?.length) {
      if (chatClient.status != "connected") {
        chatClient.begin(data.channels[0].channelId);
      } else {
        chatClient.registerRoom(data.channels[0].channelId);
      }
      set_channel(userData, data.channels[0]);
    }
  };
  useEffect(() => {
    handle_get_workspace()
  }, [userData.workspace]);
  return (
    <React.Fragment>
      <div className="page-content">
        <Helmet>
          <title>Slack | Panel</title>
        </Helmet>
        <Container fluid>
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <WorkspaceMenu name={workspace?.name ?? "CHAT"}/>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <Button type="button" color="primary" onClick={openModalAddChannel}>
                    <span className="menu-item">Crear Channel</span>
                  </Button>
                </ol>
              </div>

            </div>
          </div>
          <div className="d-lg-flex mb-4">
            <Card className="chat-leftsidebar">
              <div className="chat-message-list" data-simplebar="init"><div className="simplebar-wrapper" style={{ margin: "0px" }}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{ right: "-20px", bottom: "0px" }}><div className="simplebar-content-wrapper" style={{ height: "100%", paddingRight: "20px", paddingBottom: "0px", overflow: "hidden scroll" }}><div className="simplebar-content" style={{ padding: "0px" }}>
                <div className="p-4">
                  <div>
                    <h5 className="font-size-14 mb-3">Channels</h5>
                    <ul className="list-unstyled chat-list">
                      {(workspace.channels || []).map((item: any, _key: number) => (
                        <ChannelCardContainer userData={userData} set_channel={handle_set_channel} item={item} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div></div></div></div><div className="simplebar-placeholder" style={{ width: "auto", height: "696px" }}></div></div><div className="simplebar-track simplebar-horizontal" style={{ visibility: "hidden" }}><div className="simplebar-scrollbar" style={{ transform: "translate3d(0px, 0px, 0px)", display: "none" }}></div></div><div className="simplebar-track simplebar-vertical" style={{ visibility: "visible" }}><div className="simplebar-scrollbar" style={{ height: "26px", transform: "translate3d(0px, 0px, 0px)", display: "block" }}></div></div></div>
            </Card>
            <div className="w-100 user-chat mt-4 mt-sm-0 ms-lg-1">
              <ChatContainer channel={channel}/>
            </div>
          </div>
        </Container>
      </div>
      <ChannelModal
        closeModalAddChannel={closeModalAddChannel}
        isOpenModalAddChannel={isOpenModalAddChannel}
        handle_get_workspaces={handle_get_workspace}
      />
    </React.Fragment>
  );
};
