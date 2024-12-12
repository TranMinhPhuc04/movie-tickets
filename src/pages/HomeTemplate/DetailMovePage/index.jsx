import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import movieService from "../../../services/movieService";
import { placeholderImage } from "../_components/Constant/defaultValue";
import { Progress, Tabs } from "antd";
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
      .then((res) => {
        console.log(res);
        setDetail({ ...res.data.content });
      })
      .catch((err) => console.error(err));

    movieService
      .getDetailMovie(id)
      .then((res) => {
        setDetailRap({ ...res.data.content });
      })
      .catch((err) => console.error(err));
  }, [id]);

  console.log(detail);

  const renderDetailMovie = () => {
    // destructuring

    if (detail) {
      return (
        <div className="bg-[#0a2029] pt-[50px]">
          <div className="flex justify-center items-center container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-12 my-12">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-12">
                <div>
                  <img
                    className="mx-auto w-96 h-96 object-cover rounded-lg"
                    alt=""
                    src={detail.hinhAnh}
                    onError={onImageError}
                  />
                </div>
                <div className="text-white space-y-3 text-center md:text-left">
                  <p>{dayjs(detail.ngayKhoiChieu).format("DD-MM-YYYY")}</p>
                  <p className="font-bold text-xl">{detail.tenPhim}</p>
                  {/* <p>{detail.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0].thoiLuong ?? 120} minutes</p> */}
                  {/* <p>{detail?.heThongRapChieu[0]?.cumRapChieu[0]?.lichChieuPhim[0]?.thoiLuong ?? 120} minutes</p> */}
                  <p>120 minutes</p>
                  {/* <div className='w-full md:w-1/2'>
                <button className='py-3 mt-3 w-1/2 md:w-full mx-auto text-white bg-red-500 rounded hover:bg-red-800 duration-300' onClick={() => {}}>
                  Buy tickets
                </button>
              </div> */}
                </div>
              </div>
              {/* <Progress
                size={150}
                strokeWidth={10}
                trailColor={"white"}
                format={(percent) => (
                  <span className="text-white font-medium block">
                    {percent / 10} / 10
                  </span>
                )}
                type="circle"
                percent={detail.danhGia * 10}
                className="mx-auto"
              /> */}
            </div>
          </div>
          {detailRap?.heThongRapChieu?.length > 0 ? (
            <div className="pb-12">
              <div className="container mx-auto bg-white">
                <Tabs
                  tabPosition="left"
                  defaultActiveKey="1"
                  items={detailRap?.heThongRapChieu?.map((item, index) => {
                    const id = String(index + 1);
                    return {
                      label: (
                        <img className="w-16 h-16" src={item.logo} a lt="" />
                      ),
                      key: id,
                      children: item.cumRapChieu.map(
                        (itemChild, indexChild) => (
                          <div key={indexChild} className="my-6 space-y-3 mr-6">
                            <p className="font-bold text-[#8cc34a] text-xl">
                              {itemChild.tenCumRap}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
                              {itemChild.lichChieuPhim.map(
                                (itemLichChieu, indexLichChieu) => (
                                  <button
                                    className="bg-red-500 text-white rounded shadow px-6 py-2 cursor-pointer hover:bg-red-700 duration-300"
                                    onClick={() => {
                                      let bookingByMaLichChieuUrl =
                                        ROUTES.LIST_SEAT.replace(
                                          ":maLichChieu",
                                          itemLichChieu.maLichChieu
                                        );

                                      console.log(bookingByMaLichChieuUrl);

                                      navigate(bookingByMaLichChieuUrl);
                                    }}
                                    key={indexLichChieu}
                                  >
                                    <span className="text-normal">
                                      {dayjs(
                                        itemLichChieu.ngayChieuGioChieu
                                      ).format("DD-MM-YYYY")}
                                    </span>
                                    <span className="text-normal">
                                      {dayjs(
                                        itemLichChieu.ngayChieuGioChieu
                                      ).format(" ~ HH:mm")}
                                    </span>
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        )
                      ),
                    };
                  })}
                />
              </div>
            </div>
          ) : (
            <p className="text-center text-white pb-12 text-2xl">
              No ticket data!
            </p>
          )}
        </div>
      );
    }
  };

  if (detail.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <h1>DetailMoviePage</h1> */}
      <div>{renderDetailMovie()}</div>
    </div>
  );
}
