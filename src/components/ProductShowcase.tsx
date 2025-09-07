'use client';
import Image from "next/image";
import appScreen from "../assets/images/app-screen.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export const ProductShowcase = () => {
  const appImage = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll({
    target: appImage,
    offset: [
      'start end',
      'start start'
    ],
  });
  useEffect(() => {
    scrollYProgress.on('change', (latestValue) => 
      console.log("latestValue", latestValue)
    );
  }, []);

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  return (
    <div className="bg-black text-white bg-gradient-to-b from-black to-[#5D2CA8] py-24 py-[72px]">
      <div className="container">
        <h2 className="text-center text-5xl sm:text-6xl font-bold tracking-tighter">
          As Easy as Talking to a Friend
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-xl text-center text-white/70 mt-5">
            Our platform combines conversational AI with smart design
             templates to make web creation fast, fun, and 
             frustration-free.
          </p>
        </div>
        <motion.div 
          style={{
            opacity: opacity,
            rotateX: rotateX,
            transformPerspective: '800px',
          }}
        >
          <Image
            src={appScreen} 
            alt="The product screenshot" 
            className=" mt-14 rounded-3xl"
            ref={appImage}
            />
        </motion.div>
      </div>
    </div>
  );
};