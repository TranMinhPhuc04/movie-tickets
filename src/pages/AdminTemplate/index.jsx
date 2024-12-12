import React from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Outlet } from "react-router-dom";

const AdminTemplate = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminTemplate;
