import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminTemplate() {
  const props = useSelector((state) => state.authReducer);

  if (!props.data) {
    // redirect to login page
    return <Navigate to="/auth" />;
  }

  return (
    <div>
      <h1>Admin Template</h1>
      <Outlet />
    </div>
  );
}
