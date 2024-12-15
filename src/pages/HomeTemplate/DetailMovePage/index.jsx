import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import movieService from "../../../services/movieService";
import { placeholderImage } from "../_components/Constant/defaultValue";
import { Tabs } from "antd";
import dayjs from "dayjs";
import ROUTES from "../../../constants/routes";

export default function DetailMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState({});
  const [detailRap, setDetailRap] = useState({});
  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };

  useEffect(() => {
    movieService
      .getMovieById(id)
      .then((res) => setDetail({ ...res.data.content }))
      .catch((err) => console.error(err));

    movieService
      .getDetailMovie(id)
      .then((res) => setDetailRap({ ...res.data.content }))
      .catch((err) => console.error(err));
  }, [id]);

  const renderDetailMovie = () => {
    if (detail) {
      return (
        <div className="bg-[#0a2029] pt-12">
          <div className="container mx-auto">
            {/* Movie Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-12">
              <div>
                <img
                  className="w-96 h-96 object-cover rounded-lg mx-auto"
                  alt="Movie Poster"
                  src={detail.hinhAnh}
                  onError={onImageError}
                />
              </div>
              <div className="text-white space-y-4 text-center md:text-left">
                <p className="text-lg">
                  <strong>Ngày khởi chiếu:</strong>{" "}
                  {dayjs(detail.ngayKhoiChieu).format("DD-MM-YYYY")}
                </p>
                <h1 className="text-3xl font-bold">{detail.tenPhim}</h1>
                <p>Thời lượng: 120 phút</p>
              </div>
            </div>

            {/* Theater System */}
            {detailRap?.heThongRapChieu?.length > 0 ? (
              <div className="pb-12">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <Tabs
                    tabPosition="left"
                    defaultActiveKey="1"
                    items={detailRap?.heThongRapChieu?.map((item, index) => ({
                      label: (
                        <img
                          className="w-16 h-16"
                          src={item.logo}
                          alt={item.tenHeThongRap}
                        />
                      ),
                      key: String(index + 1),
                      children: item.cumRapChieu.map((rap, indexRap) => (
                        <div key={indexRap} className="my-6 space-y-3">
                          <p className="font-bold text-[#8cc34a] text-lg">
                            {rap.tenCumRap}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
                            {rap.lichChieuPhim.map((lichChieu, indexLich) => (
                              <button
                                key={indexLich}
                                className="bg-red-500 text-white px-3 py-1 text-sm rounded-lg shadow hover:bg-red-600 transition duration-300"
                                onClick={() =>
                                  navigate(
                                    ROUTES.LIST_SEAT.replace(
                                      ":maLichChieu",
                                      lichChieu.maLichChieu
                                    )
                                  )
                                }
                              >
                                <span className="block">
                                  {dayjs(lichChieu.ngayChieuGioChieu).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                                <span className="font-semibold">
                                  {dayjs(lichChieu.ngayChieuGioChieu).format(
                                    "HH:mm"
                                  )}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )),
                    }))}
                  />
                </div>
              </div>
            ) : (
              <p className="text-center text-white text-2xl pb-12">
                No ticket data!
              </p>
            )}
          </div>
        </div>
      );
    }
  };

  if (detail.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{renderDetailMovie()}</div>
    </div>
  );
}
