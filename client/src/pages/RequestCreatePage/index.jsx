import React from 'react';
import Sidebar from "../../components/Sidebar";
import Form from "./Form";

function RequestCreatePage() {
  return (
    <div className="flex h-screen border-3">
        <Sidebar />
        <Form />
    </div>
  )
}

export default RequestCreatePage;