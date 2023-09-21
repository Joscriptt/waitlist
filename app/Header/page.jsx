"use client";

import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

import {
  PiTwitterLogoThin,
  PiInstagramLogoThin,
  PiGithubLogoLight,
} from "react-icons/pi";

import {
  AnimatePresence,
  motion,
  useCycle,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const ButtonVariant = {
  closed: {
    height: "4rem",
    transition: { duration: 0.1 },
  },

  open: {
    height: "25rem",
    transition: { when: "beforeChildren", duration: 0.1 },
  },
};

let textvariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

// const links = [
//   { name: "Discover", href: "/" },
//   { name: "Templates", href: "/templates" },
//   { name: "Mockups", href: "/Mockups" },
//   { name: "Graphics", href: "/graphics" },
// ];
// const bootonLinks = [
//   { name: "Magazine", href: "/magazine" },
//   { name: "About", href: "/about" },
//   { name: "Support", href: "/support" },
//   { name: "Contact", href: "/contact" },
// ];

let Icons = [
  { name: <PiTwitterLogoThin />, href: "https://twitter.com/Joenaldo" },
  { name: <PiInstagramLogoThin />, href: "https://instagram.com/Joscriptt " },
  { name: <PiGithubLogoLight />, href: "https://github.com/Joscriptt" },
];

const people = [
  {
    id: 1,
    name: "INSTAGRAM",
    designation: "@Joscriptt",
    image: "/img/time.png",
    href: "https://instagram.com/Joscriptt ",
  },
  {
    id: 2,
    name: "TWITTER",
    designation: "@Joenaldo",
    image: "/img/alarm.png",
    href: "https://twitter.com/Joenaldo",
  },
  {
    id: 3,
    name: "GITHUB",
    designation: "Joscriptt",
    image: "/img/party.png",
    href: "https://github.com/Joscriptt",
  },
];

function Headpage() {
  const [open, cycleOpen] = useCycle(false, true);
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move

  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );

  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 20]),
    springConfig
  );

  const handleMouseMove = (event) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    cycleOpen(!open);
  };

  return (
    <>
      <div className="flex justify-between md:max-w-5xl max-w-lg mx-auto lg:mt-16 mt-11 md:px-8 px-9">
        <div className="flex gap-x-3 items-center">
          <Switch checked={checked} setChecked={setChecked} />
          <p className="text-sm text-white hidden md:block">
            Download as Template
          </p>
        </div>

        {/* come back to fix this later */}

        {/* <div className="flex   gap-x-6 ">
          {Icons.map((each) => (
            <div
              key={each.name}
              className="hover:text-neutral-600 cursor-pointer transition-all ease-in text-xl duration-200  dark:text-white"
            >
              <Link href={each.href}>{each.name}</Link>
            </div>
          ))}
        </div> */}

        <div className="flex flex-row gap-x-4  ">
          {people.map((testimonial, idx) => (
            <div
              className=" relative group"
              key={testimonial.name}
              onMouseEnter={() => setHoveredIndex(testimonial.id)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence mode="wait">
                {hoveredIndex === testimonial.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 10,
                      },
                    }}
                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                    style={{
                      translateX: translateX,
                      rotate: rotate,
                      whiteSpace: "nowrap",
                    }}
                    className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
                  >
                    <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                    <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                    <div className="font-bold text-white relative z-30 text-base">
                      {testimonial.name}
                    </div>
                    <div className="text-white text-xs">
                      {testimonial.designation}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <Link href={testimonial.href}>
                <Image
                  onMouseMove={handleMouseMove}
                  height={100}
                  width={100}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="object-cover !m-0 !p-0 object-top rounded-full h-8 w-8  group-hover:scale-105 group-hover:z-30   relative transition duration-500"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

{
  /* <ThemeToggleNav /> */
}
export default Headpage;

const Switch = ({ checked, setChecked }) => {
  let { resolvedTheme, setTheme } = useTheme();
  let otherTheme = resolvedTheme === "dark" ? "light" : "dark";

  let toggleTheme = (e) => {
    setChecked(e.target.checked);
    setTheme(otherTheme);
  };
  return (
    <form className="flex space-x-4  antialiased items-center">
      <label
        htmlFor="checkbox"
        className={twMerge(
          "h-7  px-1  flex items-center border border-transparent shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] rounded-full w-[60px] relative cursor-pointer transition duration-200",
          checked ? "bg-cyan-500" : "bg-[#07070A] border-slate-800"
        )}
      >
        <motion.div
          initial={{
            width: "20px",
            x: checked ? 0 : 32,
          }}
          animate={{
            height: ["20px", "10px", "20px"],
            width: ["20px", "30px", "20px", "20px"],
            x: checked ? 32 : 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          // key={String(checked)}
          className={twMerge(
            "h-[20px] block rounded-full bg-white shadow-md z-10"
          )}
        ></motion.div>
        <input
          type="checkbox"
          checked={checked}
          onChange={toggleTheme}
          className="hidden"
          id="checkbox"
        />
      </label>
    </form>
  );
};

export function ThemeToggleNav({ className, rel, mouseX, ...props }) {
  let { resolvedTheme, setTheme } = useTheme();
  let otherTheme = resolvedTheme === "dark" ? "light" : "dark";
  let [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <></>;
}
