import React, { useState, useEffect } from "react";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from "axios";
import { Helmet } from "react-helmet-async";

const users = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Characters', href: '/', current: false },
    { name: 'Teams', href: '/teams', current: true },
    { name: 'Item', href: '/item', current: false },
    { name: 'Rapture', href: '#', current: false },
    { name: 'Tools', href: '#', current: false },
  ]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function sortCharactersByStartDate(characters) {
    return characters.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}


function Teams() {
    const [charData, setCharData] = useState([]);
    const sortedCharacterData = sortCharactersByStartDate(charData);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        getAllChar();
    }, []);

    const getAllChar = async () => {
        const response = await axios.get("http://localhost:5000/character");
        setCharData(response.data);
    };

    return (
        <div className="min-h-full bg-[#101633]">
            <Helmet>
                <title>Nikke Teams List - Shifty.moe</title>
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
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <button
                                            type="button"
                                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-8 w-8 rounded-full" src={users.imageUrl} alt="#" />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
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
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={users.imageUrl} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">{users.name}</div>
                                        <div className="text-sm font-medium leading-none text-gray-400">{users.email}</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

        

            <main className="container mx-auto max-w-screen-lg border-1 bg-[#1c1f46] p-7 mb-4 mt-5 rounded">
                <div className="container mx-auto max-w-3/4 border-1 bg-sky-600 p-4 mb-4 rounded">
                    <p>Nikke Team List</p>
                </div>
                <div className='flex flex-warp  items-center gap-4'>
                    <div className="text-white"> One shot Snow White
                    <div className="container mt-2 mx-auto border-1 bg-blue-600 p-4 rounded">
                        <div className="mx-auto py-5 max-w-screen-lg ">
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                                <div>
                                    <div
                                        className={`relative bg-black p-1 rounded-md sm:h-20 sm:w-20 mb-4 hovered`}
                                    >

                                        <a href={``}>
                                            <img
                                                className={`character-type-icon object-cover rounded-md mb-1 `}
                                                src="https://static.dotgg.gg/nikke/characters/si_c191_00_s.webp"
                                                loading="lazy"
                                                alt="char"
                                            />
                                            <div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-1 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_burst_1.webp"
                                                    />

                                                </div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-6 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_class_attacker.webp"
                                                    />

                                                </div>
                                            </div>
                                        </a>
                                        <div className="text-center">
                                            <p className="text-sm sm:text-base lg:text-lg xl:text-lg xl:text-sm xl:font-bold xl:text-slate-300">Miranda</p>
                                            {/* Add additional character information here */}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div
                                        className={`relative bg-black p-1 rounded-md sm:h-20 sm:w-20 mb-4 hovered`}
                                    >

                                        <a href={``}>
                                            <img
                                                className={`character-type-icon object-cover rounded-md mb-1 `}
                                                src="https://static.dotgg.gg/nikke/characters/si_c191_00_s.webp"
                                                loading="lazy"
                                                alt="char"
                                            />
                                            <div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-1 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_burst_1.webp"
                                                    />

                                                </div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-6 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_class_attacker.webp"
                                                    />

                                                </div>
                                            </div>
                                        </a>
                                        <div className="text-center">
                                            <p className="text-sm sm:text-base lg:text-lg xl:text-lg xl:text-sm xl:font-bold xl:text-slate-300">Centi</p>
                                            {/* Add additional character information here */}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className={`relative bg-black p-1 rounded-md sm:h-20 sm:w-20 mb-4 hovered`}
                                    >

                                        <a href={``}>
                                            <img
                                                className={`character-type-icon object-cover rounded-md mb-1 `}
                                                src="https://static.dotgg.gg/nikke/characters/si_c191_00_s.webp"
                                                loading="lazy"
                                                alt="char"
                                            />
                                            <div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-1 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_burst_1.webp"
                                                    />

                                                </div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-6 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_class_attacker.webp"
                                                    />

                                                </div>
                                            </div>
                                        </a>
                                        <div className="text-center">
                                            <p className="text-sm sm:text-base lg:text-lg xl:text-lg xl:text-sm xl:font-bold xl:text-slate-300">Snow White</p>
                                            {/* Add additional character information here */}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className={`relative bg-black p-1 rounded-md sm:h-20 sm:w-20 mb-4 hovered`}
                                    >

                                        <a href={``}>
                                            <img
                                                className={`character-type-icon object-cover rounded-md mb-1 `}
                                                src="https://static.dotgg.gg/nikke/characters/si_c191_00_s.webp"
                                                loading="lazy"
                                                alt="char"
                                            />
                                            <div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-1 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_burst_1.webp"
                                                    />

                                                </div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-6 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_class_attacker.webp"
                                                    />

                                                </div>
                                            </div>
                                        </a>
                                        <div className="text-center">
                                            <p className="text-sm sm:text-base lg:text-lg xl:text-lg xl:text-sm xl:font-bold xl:text-slate-300">Maxwell</p>
                                            {/* Add additional character information here */}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className={`relative bg-black p-1 rounded-md sm:h-20 sm:w-20 mb-4 hovered`}
                                    >

                                        <a href={``}>
                                            <img
                                                className={`character-type-icon object-cover rounded-md mb-1 `}
                                                src="https://static.dotgg.gg/nikke/characters/si_c191_00_s.webp"
                                                loading="lazy"
                                                alt="char"
                                            />
                                            <div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-1 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_burst_1.webp"
                                                    />

                                                </div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-6 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_class_attacker.webp"
                                                    />

                                                </div>
                                            </div>
                                        </a>
                                        <div className="text-center">
                                            <p className="text-sm sm:text-base lg:text-lg xl:text-lg xl:text-sm xl:font-bold xl:text-slate-300">Privaty</p>
                                            {/* Add additional character information here */}
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                    </div>
                    </div>

                    <div className="text-white"> Duo Bunny
                    <div className="container mt-2 mx-auto border-1 bg-blue-600 p-4 rounded">
                        <div className="mx-auto py-5 max-w-screen-lg  ">
                            <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-5 gap-8">
                                <div>
                                    <div
                                        className={`relative bg-black p-1 rounded-md sm:h-20 sm:w-20 mb-4 hovered`}
                                    >

                                        <a href={``}>
                                            <img
                                                className={`character-type-icon object-cover rounded-md mb-1 `}
                                                src="https://static.dotgg.gg/nikke/characters/si_c191_00_s.webp"
                                                loading="lazy"
                                                alt="char"
                                            />
                                            <div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-1 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_burst_1.webp"
                                                    />

                                                </div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-6 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_class_attacker.webp"
                                                    />

                                                </div>
                                            </div>
                                        </a>
                                        <div className="text-center">
                                            <p className="text-sm sm:text-base lg:text-lg xl:text-lg xl:text-sm xl:font-bold xl:text-slate-300"></p>
                                            {/* Add additional character information here */}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div
                                        className={`relative bg-black p-1 rounded-md sm:h-20 sm:w-20 mb-4 hovered`}
                                    >

                                        <a href={``}>
                                            <img
                                                className={`character-type-icon object-cover rounded-md mb-1 `}
                                                src="https://static.dotgg.gg/nikke/characters/si_c191_00_s.webp"
                                                loading="lazy"
                                                alt="char"
                                            />
                                            <div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-1 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_burst_1.webp"
                                                    />

                                                </div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-6 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_class_attacker.webp"
                                                    />

                                                </div>
                                            </div>
                                        </a>
                                        <div className="text-center">
                                            <p className="text-sm sm:text-base lg:text-lg xl:text-lg xl:text-sm xl:font-bold xl:text-slate-300"></p>
                                            {/* Add additional character information here */}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className={`relative bg-black p-1 rounded-md sm:h-20 sm:w-20 mb-4 hovered`}
                                    >

                                        <a href={``}>
                                            <img
                                                className={`character-type-icon object-cover rounded-md mb-1 `}
                                                src="https://static.dotgg.gg/nikke/characters/si_c191_00_s.webp"
                                                loading="lazy"
                                                alt="char"
                                            />
                                            <div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-1 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_burst_1.webp"
                                                    />

                                                </div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-6 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_class_attacker.webp"
                                                    />

                                                </div>
                                            </div>
                                        </a>
                                        <div className="text-center">
                                            <p className="text-sm sm:text-base lg:text-lg xl:text-lg xl:text-sm xl:font-bold xl:text-slate-300"></p>
                                            {/* Add additional character information here */}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className={`relative bg-black p-1 rounded-md sm:h-20 sm:w-20 mb-4 hovered`}
                                    >

                                        <a href={``}>
                                            <img
                                                className={`character-type-icon object-cover rounded-md mb-1 `}
                                                src="https://static.dotgg.gg/nikke/characters/si_c191_00_s.webp"
                                                loading="lazy"
                                                alt="char"
                                            />
                                            <div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-1 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_burst_1.webp"
                                                    />

                                                </div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-6 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_class_attacker.webp"
                                                    />

                                                </div>
                                            </div>
                                        </a>
                                        <div className="text-center">
                                            <p className="text-sm sm:text-base lg:text-lg xl:text-lg xl:text-sm xl:font-bold xl:text-slate-300"></p>
                                            {/* Add additional character information here */}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className={`relative bg-black p-1 rounded-md sm:h-20 sm:w-20 mb-4 hovered`}
                                    >

                                        <a href={``}>
                                            <img
                                                className={`character-type-icon object-cover rounded-md mb-1 `}
                                                src="https://static.dotgg.gg/nikke/characters/si_c191_00_s.webp"
                                                loading="lazy"
                                                alt="char"
                                            />
                                            <div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-1 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_burst_1.webp"
                                                    />

                                                </div>
                                                <div className="absolute bg-black bg-opacity-60 rounded-md top-0 left-6 mt-1 mr-1">

                                                    <img
                                                        alt="class 1"
                                                        className="character-type-image w-5"
                                                        src="https://static.dotgg.gg/nikke/icon/icn_class_attacker.webp"
                                                    />

                                                </div>
                                            </div>
                                        </a>
                                        <div className="text-center">
                                            <p className="text-sm sm:text-base lg:text-lg xl:text-lg xl:text-sm xl:font-bold xl:text-slate-300"></p>
                                            {/* Add additional character information here */}
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                    </div>
                    </div>
                </div>
                
            </main>
            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4">
                <p>Built with 💖 dear Shifty</p>
            </footer>

        </div>


    );
}

export default Teams;