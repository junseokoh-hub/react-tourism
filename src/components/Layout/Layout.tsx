import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <main className="py-20 px-3">{children}</main>;
};

export default Layout;
