import React from "react";
import Navbar from "../../components/Navbar";
import AdminProductForm from "../../containers/admin/AdminProductForm";
import { useParams } from "react-router-dom";

const AdminProductFormPage = () => {
  const params = useParams();
  return (
    <div>
      <Navbar></Navbar>
      <AdminProductForm id={params.id}></AdminProductForm>
    </div>
  );
};

export default AdminProductFormPage;
