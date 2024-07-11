import "./layout.scss";
import NavigationSidebar from "@/components/custom/NavigationSidebar/NavigationSidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main-layout-container">
      <NavigationSidebar />

      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
