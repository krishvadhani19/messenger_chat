import ServerSearch from "./ServerSearch/ServerSearch";
import ServerChannels from "./ServerChannels/ServerChannels";
import "./ServerSidebarMain.scss";

const ServerSidebarMain = () => {
  return (
    <div className="server-sidebar-main">
      <ServerSearch />

      <ServerChannels />
    </div>
  );
};

export default ServerSidebarMain;
