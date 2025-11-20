import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <div className="p-3 md:p-0">{children}</div>
      <Footer />
    </>
  );
};

export default layout;
