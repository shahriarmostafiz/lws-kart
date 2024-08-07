import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import sofa from "@/public/icons/sofa.svg"
import terrace from "@/public/icons/terrace.svg"
import bed from "@/public/icons/bed.svg"
import office from "@/public/icons/office.svg"
import cafe from "@/public/icons/outdoor-cafe.svg"
import mattress from "@/public/icons/bed-2.svg"
import kitchen from "@/public/icons/kitchenIcon.svg"
import { auth } from '@/auth';
import LoggedUserAction from './LoggedUserAction';
import { getDictionary } from '@/app/[language]/dictionary';
import LanguageSwitcher from './LanguageSwitcher';

const categoryData = [
    {
        icon: bed,
        category: "bedroom"
    },
    {
        icon: mattress,
        category: "mattress"
    },
    {
        icon: cafe,
        category: "outdoor"
    },
    {
        icon: sofa,
        category: "sofa"
    },
    {
        icon: terrace,
        category: "living"
    },
    {
        icon: kitchen,
        category: "kitchen"
    },
]

const NavBar = async ({ lang }) => {
    const userInfo = await auth()
    const dictionary = await getDictionary(lang)

    return (
        <nav className="bg-gray-800">
            <div className="container flex">
                <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                    <span className="text-white">
                        <i className="fa-solid fa-bars" />
                    </span>
                    <span className="capitalize ml-2 text-white hidden">{dictionary?.allCategories}</span>
                    {/* dropdown */}
                    <div
                        className="absolute z-30  left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
                        style={{ width: 300 }}
                    >{
                            categoryData?.map(item => <Link
                                prefetch={false}
                                key={item.category}
                                href={`/${lang}/categories/${item?.category.toLowerCase()}`}
                                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                            >
                                <Image
                                    src={item?.icon}
                                    alt={item?.category}
                                    className="w-5 h-5 object-contain"
                                />
                                <span className="ml-6 text-gray-600 text-sm">{
                                    dictionary[item?.category]
                                }</span>
                            </Link>)
                        }


                    </div>
                </div>
                <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
                    <div className="flex items-center space-x-6 capitalize">
                        <Link
                            href={`/${lang}`}
                            className="text-gray-200 hover:text-white transition"
                        >
                            {dictionary?.home}
                        </Link>
                        <Link prefetch={false}
                            href={`/${lang}/shop`}
                            className="text-gray-200 hover:text-white transition"
                        >
                            {dictionary?.shop}
                        </Link>
                        <Link
                            href={`/${lang}/about`}
                            className="text-gray-200 hover:text-white transition">
                            {dictionary?.aboutUs}
                        </Link>
                        <Link
                            href={`/${lang}/contact`}
                            className="text-gray-200 hover:text-white transition">
                            {dictionary?.contactUs}
                        </Link>
                        <LanguageSwitcher />
                    </div>
                    {
                        userInfo?.user ? (<>
                            <LoggedUserAction name={userInfo?.user?.name}
                                logout={dictionary?.logout}
                            />
                        </>) : <Link
                            href="/login"
                            className="text-gray-200 hover:text-white transition"
                        >
                            {dictionary?.login}
                        </Link>
                    }

                </div>
            </div>
        </nav>

    );
};

export default NavBar;