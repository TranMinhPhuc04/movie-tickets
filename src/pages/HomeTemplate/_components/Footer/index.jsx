import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">GIỚI THIỆU</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Về Chúng Tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Thỏa Thuận Sử Dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Quy Chế Hoạt Động
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chính Sách Bảo Mật
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">GÓC ĐIỆN ẢNH</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Thể Loại Phim
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Bình Luận Phim
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog Điện Ảnh
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Phim Hay Tháng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Phim IMAX
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">HỖ TRỢ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Góp Ý
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sale & Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Rạp / Giá Vé
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Tuyển Dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col items-center sm:items-start">
            <img
              src="./images/logo.jpg"
              alt="Galaxy Cinema"
              className="w-32 mb-4"
            />
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <img
              src="./images/logo1.png"
              alt="Certification"
              className="w-20"
            />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-600 pt-4 text-center text-sm">
          <p className="text-gray-400">
            CÔNG TY CỔ PHẦN PHIM THIÊN NGÂN
            <br />
            3/9 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, Tp. Hồ Chí Minh, Việt Nam
            <br />
            Điện thoại: 028.3933.303 - Email:{" "}
            <a href="mailto:hotro@galaxystudio.vn" className="hover:underline">
              hotro@galaxystudio.vn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
