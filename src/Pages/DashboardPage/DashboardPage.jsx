import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const user = useSelector((state) => state.auth.user);

  return <div>Welcome, {user?.name || "Guest"}! Dashbaord</div>;
};

export default DashboardPage;
