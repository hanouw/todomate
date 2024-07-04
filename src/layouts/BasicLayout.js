import Header from "./Header";

const BasicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default BasicLayout;
