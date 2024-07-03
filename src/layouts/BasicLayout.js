import NavigationBar from "../components/main/NavigationBar";
import Header from "./Header";

const BasicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <NavigationBar />
    </>
  );
};

export default BasicLayout;
