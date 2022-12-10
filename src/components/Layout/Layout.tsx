import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <section className="py-20 px-3 min-h-screen bg-white transition-colors dark:bg-black">
      {children}
    </section>
  );
};

export default Layout;
