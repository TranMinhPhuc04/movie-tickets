import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/userService";
import { AuthContext } from "../../../contexts/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({ taiKhoan: "", matKhau: "" });
  const [error, setError] = useState(""); // Để hiển thị lỗi nếu đăng nhập thất bại
  const navigate = useNavigate(); // Khai báo useNavigate
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login(formData);
      console.log("Login successful:", response.data);

      // Gọi hàm login từ AuthContext
      login(response.data.content);

      // Chuyển hướng về trang chủ
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Đăng nhập
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="taiKhoan" className="block text-gray-700">
              Tài khoản
            </label>
            <input
              type="taiKhoan"
              id="taiKhoan"
              name="taiKhoan"
              value={formData.taiKhoan}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Nhập tài khoản"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="matKhau"
              name="matKhau"
              value={formData.matKhau}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Đăng nhập
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/register" className="text-blue-600 hover:underline text-sm">
            Chưa có tài khoản? Đăng ký ngay
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
