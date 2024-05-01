"use client";

// I WANTED USING ZOD FOR ERROR HANDLING BUT ITS A MINI PROJECT
// PROBABLY NEXT TUTORIAL
import { PiWarningThin } from "react-icons/pi";
import { TbArrowsJoin2 } from "react-icons/tb";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import {
  AnimatePresence,
  motion,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

import Snowfall from "react-snowfall";

const people = [
  {
    id: 1,
    name: "JOIN NOW",
    designation: "How bout u join my fuqin waitlist ",
    image: "/img/email.png",
    href: "https://instagram.com/Joscriptt ",
  },
];

// useForm
import { useForm, Controller } from "react-hook-form";
// Zod
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email().min(5, "Email must be at least 5 characters long"),
});

function PageHook() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

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

  const validateEmail = (mail) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(mail);
  };

  const handleOpenModel = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 4000);
  };

  const onSubmit = async (data) => {
    try {
      let res = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(data.email),
      });
      if (res.ok) {
        reset();
        handleOpenModel();
      }

      if (!res.ok) {
        reset();
        throw new Error({ message: "Email already exists" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full p-3 flex items-center justify-center relative z-50">
      <Snowfall
        snowflakeCount={200}
        color="grey"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: -9,
        }}
        speed={"140"}
        radius={"12"}
      />
      <section className=" mt-5 ">
        <div className="space-y-4 ">
          <div className="space-y-2 text-center">
            <div className="flex justify-center">
              {/* You can use video here as well */}
              <Image
                width={128}
                height={128}
                alt="shake head"
                src={"/img/

