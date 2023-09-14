import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import NextLink from 'next/link';
import TASCLogoLight from '@/assets/img/TASCLogoLight.png';
import TASCLogoDark from '@/assets/img/TASCLogoDark.png';
import Image from 'next/image';
import useDarkSide from '@/components/UseDarkSide';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

interface NAV_ITEMS {
    title: string;
    href: string;
}

const Navbar = () => {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState<boolean>(colorTheme === 'light');
    const [isOpen, setIsOpen] = useState(false);
    const menuAnimation = useAnimation();

    const toggleDarkMode = (checked: boolean) => {
        setTheme(checked ? 'dark' : 'light');
        setDarkSide(checked);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        menuAnimation.start(isOpen ? { x: '100%' } : { x: 0 });
    };

    const NAV_ITEMS: Array<NAV_ITEMS> = [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'Team',
            href: '/team',
        },
        {
            title: 'Events',
            href: '/events',
        },
    ];

    return (
        <>
            <motion.div
                initial="initialState"
                animate="animateState"
                exit="exitState"
                transition={{
                    duration: 1,
                }}
                variants={{
                    initialState: {
                        opacity: 0,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                    },
                    animateState: {
                        opacity: 1,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                    },
                    exitState: {
                        clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
                    },
                }}
                className={'z-50'}
            >
                <div className={'hidden md:flex bg-white dark:bg-black text-black dark:text-white items-center justify-between py-10 px-10'}>
                    <Image
                        src={colorTheme === 'light' ? TASCLogoLight : TASCLogoDark}
                        width={100}
                        height={100}
                        alt={'TASC'}
                    />

                    <ul className={'flex space-x-5'}>
                        {NAV_ITEMS.map((item) => (
                            <NextLink key={item.title} href={item.href}>
                                <li>
                                    {item.title}
                                </li>
                            </NextLink>
                        ))}
                    </ul>

                    <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={28} className="duration-200" />
                </div>

                <div className="flex md:hidden bg-white dark:bg-black text-black dark:text-white items-center justify-between py-10 px-10 relative">
                    <Image
                        src={colorTheme === 'light' ? TASCLogoLight : TASCLogoDark}
                        width={80}
                        height={80}
                        alt={'TASC'}
                    />

                    <AiOutlineMenu size={30} onClick={toggleMenu} />

                    <motion.div
                        className={`h-screen fixed w-64 bg-gray-800 p-4 top-0 right-0 transform ${
                            isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                        initial={false}
                        animate={menuAnimation}
                    >
                        <AiOutlineClose
                            size={30}
                            onClick={toggleMenu}
                            style={{ cursor: 'pointer' }}
                        />
                        <ul className="h-full space-y-4 text-white">
                            {NAV_ITEMS.map((item) => (
                                <NextLink key={item.title} href={item.href}>
                                    <li>{item.title}</li>
                                </NextLink>
                            ))}
                            <li>
                                <DarkModeSwitch
                                    checked={darkSide}
                                    onChange={toggleDarkMode}
                                    size={28}
                                    className="duration-200"
                                />
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default Navbar;