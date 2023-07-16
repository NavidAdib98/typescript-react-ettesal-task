import React from "react";
// components
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div style={{ marginTop: 80, marginLeft: 10, marginRight: 10 }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
