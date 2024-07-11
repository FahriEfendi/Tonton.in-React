import axios from "axios"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
//import Layout from "@/app/LayoutTitle";

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Category', href: '/category', current: false },
  { name: 'Tag', href: '/tag', current: false },
  { name: 'Announcement', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const RaraNadifa = ({ videoId }) => {
  const { characterId } = useParams();
  const [title, setTitle] = useState("");
  const [like, setLike] = useState("");
  const [dislike, setDislike] = useState("");
  const [description, setDescription] = useState("");
  const [views, setViews] = useState("");
  const [tag, setTag] = useState("");
  const [msg, setMsg] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setDisIsliked] = useState(false);
 
  useEffect(() => {
    const getCharId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getvideos/4734da25-ae1c-48df-a39b-2f34f9cdea7d`
        );
        setTitle(response.data.data.title);
        setLike(response.data.data.vid_like);
        setDislike(response.data.data.dislike);
        setDescription(response.data.data.description);
        setViews(response.data.data.views);
        setTag(response.data.data.id_tag);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    getCharId();
  }, [characterId]);

  useEffect(() => {
    // Mengambil status like dari penyimpanan lokal
    let liked = localStorage.getItem('liked_videos');

    // Jika belum ada status like, inisialisasi menjadi objek kosong
    if (!liked) {
      liked = {};
    } else {
      liked = JSON.parse(liked);
    }

    // Jika video sudah dilike sebelumnya, atur jumlah like sesuai dengan penyimpanan lokal
    if (liked[videoId]) {
      setLike(liked[videoId]);
      setIsLiked(true);
    
    }
  }, [videoId]);

  useEffect(() => {
    // Mengambil status like dari penyimpanan lokal
    let disliked = localStorage.getItem('disliked_videos');

    // Jika belum ada status like, inisialisasi menjadi objek kosong
    if (!disliked) {
      disliked = {};
    } else {
      disliked = JSON.parse(disliked);
    }

    // Jika video sudah dilike sebelumnya, atur jumlah like sesuai dengan penyimpanan lokal
    if (disliked[videoId]) {
      setDislike(disliked[videoId]);
      setDisIsliked(true);
    
    }
  }, [videoId]);

  const handleLikeClick = async () => {
    // Mengambil status like dari penyimpanan lokal
    let liked = localStorage.getItem('liked_videos');
    let dislike = localStorage.getItem('disliked_videos');
  
    // Jika belum ada status like, inisialisasi menjadi objek kosong
    if (!liked) {
      liked = {};
    } else {
      liked = JSON.parse(liked);
    }
  
    // Jika video sudah dilike sebelumnya, ubah status like menjadi dislike
    if (liked[videoId]) {
      try {
        const response = await fetch(`http://localhost:8080/videos/declike/4734da25-ae1c-48df-a39b-2f34f9cdea7d`, {
          method: 'PUT',
        });
        if (!response.ok) {
          throw new Error('Failed to unlike video');
        }
           // Update status dislike di penyimpanan lokal
           delete liked[videoId];
           localStorage.setItem('liked_videos', JSON.stringify(liked));
        // Update jumlah like di UI setelah berhasil unlike video
        setLike(like); // Mengurangi 1 dari nilai sebelumnya
        setIsLiked(false);
  
      } catch (error) {
        console.error(error);
        alert('Failed to unlike video');
      }
    } else {
      // Jika video belum dilike sebelumnya, tambahkan like
      if (dislike && dislike[videoId]) {
        // Hapus data dari liked_videos di localStorage
       
  
        try {
          const response = await fetch(`http://localhost:8080/videos/incdislike/4734da25-ae1c-48df-a39b-2f34f9cdea7d`, {
            method: 'PUT',
          });
          if (!response.ok) {
            throw new Error('Failed to like video');
          }
          // Update status dislike di penyimpanan lokal
          dislike[videoId] = false;
          localStorage.setItem('disliked_videos', JSON.stringify(dislike));
  
          // Update jumlah dislike di UI setelah berhasil like video
         
          setLike(true);
          setDisIsliked(true);
  
        } catch (error) {
          console.error(error);
          alert('Failed to like video');
        }
      }
  
      try {
        const response = await fetch(`http://localhost:8080/videos/inclike/4734da25-ae1c-48df-a39b-2f34f9cdea7d`, {
          method: 'PUT',
        });
        if (!response.ok) {
          throw new Error('Failed to like video');
        }
        setLike(true);
        setDislike(false);
  
      // Hapus data dislike dari localStorage jika ada
      localStorage.removeItem('disliked_videos');
  
      // Simpan data like ke localStorage
      localStorage.setItem('liked_videos', JSON.stringify({ [videoId]: true }));
  
      } catch (error) {
        console.error(error);
        alert('Failed to like video');
      }
    }
  };
  
  const handleDislikeClick = async () => {
    // Mengambil status dislike dari penyimpanan lokal
    let disliked = localStorage.getItem('disliked_videos');
    let liked = localStorage.getItem('liked_videos');
  
    // Jika belum ada status dislike, inisialisasi menjadi objek kosong
    if (!disliked) {
      disliked = {};
    } else {
      disliked = JSON.parse(disliked);
    }
  
    // Jika video sudah didislike sebelumnya, ubah status dislike menjadi like
    if (disliked[videoId]) {
      try {
        const response = await fetch(`http://localhost:8080/videos/decdislike/4734da25-ae1c-48df-a39b-2f34f9cdea7d`, {
          method: 'PUT',
        });
        if (!response.ok) {
          throw new Error('Failed to undislike video');
        }
        // Update status dislike di penyimpanan lokal
        delete disliked[videoId];
        localStorage.setItem('disliked_videos', JSON.stringify(disliked));
  
        // Update jumlah dislike di UI setelah berhasil undislike video
        setDislike(dislike); // Mengurangi 1 dari nilai sebelumnya
        setDisIsliked(false);
  
      } catch (error) {
        console.error(error);
        alert('Failed to undislike video');
      }
    } else {
      // Jika video belum didislike sebelumnya, tambahkan dislike
      if (liked && liked[videoId]) {
        // Hapus data dari liked_videos di localStorage

        try {
          const response = await fetch(`http://localhost:8080/videos/declike/4734da25-ae1c-48df-a39b-2f34f9cdea7d`, {
            method: 'PUT',
          });
          if (!response.ok) {
            throw new Error('Failed to dislike video');
          }
          // Update status dislike di penyimpanan lokal
        delete disliked[videoId];
        localStorage.setItem('disliked_videos', JSON.stringify(disliked));
  
          // Update jumlah dislike di UI setelah berhasil dislike video
          setLike(prevLike => prevLike - 1); // Mengurangi 1 dari nilai sebelumnya
          setLike(true);
          setDislike(false)
          setIsLiked(true);
  
        } catch (error) {
          console.error(error);
          alert('Failed to dislike video');
        }
      }
  
      try {
        const response = await fetch(`http://localhost:8080/videos/incdislike/4734da25-ae1c-48df-a39b-2f34f9cdea7d`, {
          method: 'PUT',
        });
        if (!response.ok) {
          throw new Error('Failed to dislike video');
        }
         // Set disliked menjadi true dan liked menjadi false
      setDislike(true);
      setLike(false);
  
      // Hapus data like dari localStorage jika ada
      localStorage.removeItem('liked_videos');
  
      // Simpan data dislike ke localStorage
      localStorage.setItem('disliked_videos', JSON.stringify({ [videoId]: true }));
  
      } catch (error) {
        console.error(error);
        alert('Failed to dislike video');
      }
    }
  };
  
  /* const handleLikeClick = async () => {
    
    try {
      // Lakukan request untuk menyimpan like ke server
      const response = await fetch(`http://localhost:8080/videos/inclike/4734da25-ae1c-48df-a39b-2f34f9cdea7d`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to like video');
      }
  
      // Set liked menjadi true dan disliked menjadi false
      setLike(true);
      setDislike(false);
  
      // Hapus data dislike dari localStorage jika ada
      localStorage.removeItem('disliked_videos');
  
      // Simpan data like ke localStorage
      localStorage.setItem('liked_videos', JSON.stringify({ [videoId]: true }));
    } catch (error) {
      console.error(error);
      alert('Failed to like video');
    }
  };

  const handleDislikeClick = async () => {
    try {
      // Lakukan request untuk menyimpan dislike ke server
      const response = await fetch(`http://localhost:8080/videos/incdislike/4734da25-ae1c-48df-a39b-2f34f9cdea7d`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to dislike video');
      }
  
      // Set disliked menjadi true dan liked menjadi false
      setDislike(true);
      setLike(false);
  
      // Hapus data like dari localStorage jika ada
      localStorage.removeItem('liked_videos');
  
      // Simpan data dislike ke localStorage
      localStorage.setItem('disliked_videos', JSON.stringify({ [videoId]: true }));
    } catch (error) {
      console.error(error);
      alert('Failed to dislike video');
    }
  }; */

  return (
    <div className="min-h-full bg-[#101633]">
        <Helmet>
          <title>{title}</title>
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
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
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
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main className="container mx-auto max-w-screen-lg border-1 bg-[#1c1f46] p-7 mb-4 mt-5 rounded">
          <div className="container mx-auto max-w-3/4 border-1 bg-[#24285a] xl:p-0 p-4 md:p-0 xl:p-0 2xl:p-0 rounded">
            <div className="mx-auto max-w-full sm:max-w-screen-lg py-6 sm:px-6 lg:px-8">
              <div className="relative h-0" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://d0000d.com/e/xxd6sf7eczag"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              <div>
                <h1 className="text-white text-xl mt-4">{title}</h1>
              </div>

              <div className="container mx-auto max-w-3/4 border-1 bg-sky-600 p-2 mt-4 rounded text-sm">
                <span className="font-semibold">{views} x ditonton  Telah tayang perdana pada 20 Jan 2024</span>
                <p>{description}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <button
                    className="flex items-center space-x-2 text-white"
                    onClick={handleLikeClick}
                    style={{ color: isLiked ? 'blue' : 'white' }}
                  >
                    <FaThumbsUp className="h-6 w-6" />
                    <span>{like >= 1000000 ? `${(like / 1000000).toFixed(1)} m` : like >= 1000 ? `${(like / 1000).toFixed(1)} k` : like}</span>
                  </button>
                  <button 
                  className="flex items-center space-x-2 text-white"
                  onClick={handleDislikeClick}
                  style={{ color: isDisliked ? 'blue' : 'white' }}
                  >
                    <FaThumbsDown className="h-6 w-6" />
                    <span>{dislike >= 1000000 ? `${(dislike / 1000000).toFixed(1)} m` : dislike >= 1000 ? `${(dislike / 1000).toFixed(1)} k` : dislike}</span>
                  </button>
                </div>
                <div className="text-white text-base">
                  <p>Uploaded by: Admin</p>
                  <p>Uploaded on: 22 Feb 2024</p>
                  <p>Tags: {tag}</p>
                </div>
              </div>
              <div className="container mx-auto max-w-3/4 border-1 bg-sky-600 p-2 mt-4 rounded text-sm">
                <span className="text-white text-base mt-4">Trending Videos</span>
              </div>
            </div>
          </div>
        </main>



        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>Built with 💖 dear Shifty</p>
        </footer>
    </div>
  )
};

export default RaraNadifa;
