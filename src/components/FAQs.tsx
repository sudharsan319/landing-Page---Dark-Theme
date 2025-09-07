"use client";
import React from "react";
import PlusIcon from "../assets/icons/plus.svg";
import MinusIcon from "../assets/icons/minus.svg";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

const items = [
  {
    question: "What types of websites can I create?",
    answer:
      "You can create any type of website—from portfolios and blogs to business sites and e-commerce stores. Just describe what you need, and our AI will design it for you.",
  },
  {
    question: "Do I need coding or design skills?",
    answer:
      "Not at all! Our AI handles all the technical and design work. You simply speak or type your ideas, and your website is built automatically.",
  },
  {
    question: "When will early access be available?",
    answer:
      "We’re launching our beta to early users in the coming weeks. Join the waitlist today to be among the first to try it.",
  },
  {
    question: "Can I edit the website after it’s created?",
    answer:
      "Yes! Once the AI generates your site, you can fully customize layouts, colors, text, and more with our built-in editor.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use end-to-end encryption and follow industry-leading security practices to ensure your data is protected at all times.",
  },
];


const AccordionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      className="py-7 border-b border-white/30"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center">
        <span className="flex-1 text-lg font-bold">{question}</span>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: "16px" }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQs = () => {
  return (
    <div className="bg-black text-white bg-gradient-to-b from-[#5D2CA8] to-black py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center text-5xl sm:text-6xl sm:max-w-[648px] mx-auto font-bold tracking-tighter">
          Frequently asked questions
        </h2>
        <div className="mt-12 max-w-[648px] mx-auto">
          {items.map(({ question, answer }) => (
            <AccordionItem question={question} answer={answer} key={question} />
          ))}
        </div>
      </div>
    </div>
  );
};