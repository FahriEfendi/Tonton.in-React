import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { FaEye } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { FaListUl } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Category", href: "/category", current: false },
  { name: "Tag", href: "/tag", current: false },
  { name: "Announcement", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Dashboard() {
  const [vidData, setVidData] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
  const videosPerPage = 16;
  const pagesVisited = pageNumber * videosPerPage;

  useEffect(() => {
    getAllVid();
  }, []);

  const getAllVid = async () => {
    const response = await axios.get(`http://localhost:8080/getallvideos`);
    setVidData(response.data);
    console.log(response.data);
  };
  const displayVideos =
    vidData &&
    vidData.data &&
    vidData.data
      .filter((video) => video.title && video.title.toLowerCase())
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(pagesVisited, pagesVisited + videosPerPage)
      .map((video, index) => (
        <a
          key={index}
          href={`/videos/${video.slug}`}
          className="relative bg-black
     p-1 rounded-md mb-4 hovered mr-4"
          style={{ position: "relative", display: "inline-block" }}
        >
          <img
            className="rounded-md mb-1 h-24 w-52"
            src={video.vid_thumbnail}
            loading="lazy"
            alt="char"
          />
          <div className="absolute inset-x-0 bottom-0 text-center flex space-x-4 justify-between">
            <p
              className="text-sm text-white sm:text-base lg:text-lg xl:text-lg xl:text-sm  xl:text-slate-300 flex items-center "
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <FaEye style={{ marginRight: "0.25rem" }} />{" "}
              <span style={{ marginLeft: "0.25rem" }}>
                {video.views >= 1000000
                  ? `${(video.views / 1000000).toFixed(1)} m`
                  : video.views >= 1000
                  ? `${(video.views / 1000).toFixed(1)} k`
                  : video.views}
              </span>
            </p>
            <p
              className="text-sm text-white sm:text-base lg:text-sm xl:text-sm xl:text-sm  xl:text-slate-300 flex items-center"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <CiClock2 style={{ marginRight: "0.25rem" }} />{" "}
              <span style={{ marginLeft: "0.25rem" }}>{video.time}</span>
            </p>
          </div>
          <div className="absolute inset-x-0 text-center">
            <p className="text-sm text-white sm:text-base lg:text-lg xl:text-lg xl:text-sm xl:font-bold xl:text-slate-300">
              {video.title.length > 8
                ? `${video.title.substring(0, 25)}...`
                : video.title}
            </p>
          </div>
        </a>
      ));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="min-h-full bg-[#101633]">
      <Helmet>
        <title>Home - Nonton.in</title>
      </Helmet>

      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                      <form action="/" method="get">
                        <input
                          type="text"
                          name="s"
                          id="search"
                          placeholder="Search..."
                          className="rounded-md px-3 py-2 text-sm font-medium bg-gray-700 text-white focus:outline-none "
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <marquee className="text-white">
        Info : Mohon Maaf Untuk Sementara Web Dalam Development Sehingga Masih
        Adanya Bug.Terima Kasih
      </marquee>
      <main className="container mx-auto max-w-screen-lg border-1 bg-[#1c1f46] p-7 mb-4 mt-5 rounded">
        <div className="container mx-auto max-w-3/4 border-1 bg-sky-600 p-4 mb-4 rounded">
          <p>
            Selamat Datang Di Website Kami menyediakan video terbaru setiap
            hari.
          </p>
        </div>

        <div className="container mx-auto max-w-3/4 border-1 bg-blue-600 p-4 rounded">
          <div className="mx-auto max-w-screen-lg py-6 sm:px-6 lg:px-8 ">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-4 gap-2">
              {displayVideos}
            </div>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={Math.ceil(
                vidData && vidData.data && vidData.data.length / videosPerPage
              )}
              onPageChange={changePage}
              containerClassName={"pagination"}
              previousLinkClassName={"previous"}
              nextLinkClassName={"next"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </main>

      {/*  <aside className="mx-auto max-w-screen-lg border-1 bg-[#1c1f46] p-7 mb-4 mt-5 rounded">
</aside> */}
      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>Built with 💖 dear Shifty</p>
      </footer>
    </div>
  );
}

export default Dashboard;
