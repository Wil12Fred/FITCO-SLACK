import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useWorkspaceStore } from "src/hooks/useWorkspaceStore";
import { Button, Card, Container } from "reactstrap";
import useModal from "src/hooks/useModal";

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
  const handle_get_workspace = async () => {
    const data = await get_workspace(userData.workspace?.workspaceId);
    if (userData && !userData.channel && data?.channels?.length) {
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
                  </div>
                </div>
              </div></div></div></div><div className="simplebar-placeholder" style={{ width: "auto", height: "696px" }}></div></div><div className="simplebar-track simplebar-horizontal" style={{ visibility: "hidden" }}><div className="simplebar-scrollbar" style={{ transform: "translate3d(0px, 0px, 0px)", display: "none" }}></div></div><div className="simplebar-track simplebar-vertical" style={{ visibility: "visible" }}><div className="simplebar-scrollbar" style={{ height: "26px", transform: "translate3d(0px, 0px, 0px)", display: "block" }}></div></div></div>
            </Card>
          </div>
        </Container >
      </div>
    </React.Fragment>
  );
};
