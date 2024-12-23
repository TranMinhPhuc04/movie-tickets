import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { fetchBanner } from "./duck/bannerReducer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const dispatch = useDispatch();
  const { banners, loading, error } = useSelector(
    (state) => state.bannerReducer
  );

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px] sm:h-[600px] lg:h-[800px] bg-gray-200">
        <p className="text-lg sm:text-xl text-gray-700">Đang tải banner...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px] sm:h-[600px] lg:h-[800px] bg-gray-200">
        <p className="text-lg sm:text-xl text-red-500">Lỗi: {error}</p>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    accessibility: true,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {banners?.map((banner, index) => (
          <div key={index}>
            <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[800px]">
              {/* Hình ảnh banner */}
              <img
                src={banner.hinhAnh}
                alt={banner.tenPhim}
                className="w-full h-full object-cover"
              />
              {/* Lớp phủ nội dung */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white px-4 sm:px-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
                  {banner.tenPhim}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
