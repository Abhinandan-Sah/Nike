import React from "react";
import AdminCategoryFilter from "../../components/admin/AdminCategoryFilter";
import AdminProductList from "../../components/admin/AdminProductList";

const AdminHome = () => {
  return (
    <div>
      <AdminCategoryFilter>
        <AdminProductList></AdminProductList>
      </AdminCategoryFilter>
    </div>
  );
};

export default AdminHome;
