import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actLogin } from "./duck/reducer";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const props = useSelector((state) => state.authReducer);

  useEffect(() => {
    // kiểm tra xem đã đăng nhập chưa => redirect admin/dashboard
    if (props.data) {
      navigate("/admin/dashboard");
    }
  }, [props.data]);

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    // ngăn chặn sự kiện load lại trang khi submit form
    e.preventDefault();
    dispatch(actLogin(user));
  };

  if (props.loading) return <p>Loading...</p>;

  const renderError = () => {
    const { error } = props;
    if (error) {
      return (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{error.data.content}</span>
        </div>
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-5">
        {renderError()}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            name="taiKhoan"
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            name="matKhau"
            onChange={handleChange}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
}
