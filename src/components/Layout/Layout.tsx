import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="py-20 px-3 max-w-3xl bg-white md:mx-auto md:shadow-2xl">
      {children}
    </main>
  );
};

export default Layout;
