"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import ArrowWIcon from "../assets/icons/arrow-w.svg";
import cursorImage from "../assets/images/cursor.png";
import { motion } from "framer-motion";
import ParticleAnimation from "../lib/ParticleAnimation"; // import class

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
  if (canvasRef.current) {
    new ParticleAnimation(canvasRef.current, {
      quantity: 120,
      size: [1, 4], // min 2px, max 6px
      colors: ["#FF6EC7", "#ae77f8", "#A7F3D0"], // pink, cyan, mint
      staticity: 50,
      ease: 40,
      });
    }
  }, []);


  return (
    <div className="bg-black text-white relative overflow-clip py-[72px] sm:py-24 bg-[linear-gradient(to_bottom,#000,#200D42_0%,#FFFFFF_0%,#A46EDB_82%)]">
      {/* Particle canvas */}
      {/* <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" /> */}

      <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] lg:h-[1200px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border border-[#B48CDE] bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div>

      <div className="container relative z-10">
        <div className="mt-[-9px] flex items-center justify-center">
          <a
            href="#"
            className="inline-flex gap-3 border py-1 px-2 mt-[-8px] rounded-lg border-white/30"
          >
            <span className="bg-[linear-gradient(to_right,#F87AFF,#FB93D0,#FFDD99,#C3F0B2,#2FD8FE)] text-transparent bg-clip-text [-webkit-background-clip:text]">
              Version 1.0 is here
            </span>
            <span className="inline-flex items-center gap-1">
              <span>Read More</span>
              <ArrowWIcon />
            </span>
          </a>
        </div>

        <div className="flex justify-center mt-6">
          <div className="inline-flex relative">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Build Websites with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-400">Voice AI</span>

            </h1>

            {/* <motion.div
              className="absolute right-[900px] top-[108px] hidden sm:inline"
              drag
              dragSnapToOrigin
            >
              <Image
                src={cursorImage}
                height="200"
                width="200"
                alt=""
                className="max-w-none"
                draggable="false"
              />
            </motion.div> */}
          </div>
        </div>

        <div className="flex justify-center">
          <p className="text-center text-xl mt-8 max-w-md">
            Imagine building your website like having a conversation.
            Describe your idea, style, and features, and our voice-powered AI turns it into a complete, responsive site—ready to launch.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <button className="bg-white text-black py-3 px-5 rounded-lg font-medium">
            Join the Waitlist
          </button>
        </div>
      </div>
    </div>
  );
};
