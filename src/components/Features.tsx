import EcosystemIcon from "../assets/icons/ecosystem.svg";
import { Feature } from "./Feature";

const features = [
  {
    title: " Voice-to-Website Creation",
    description:
      "Simply speak your requirements—our AI handles the design, structure, and content.",
  },
  {
    title: "Instant Design Previews",
    description:
      "See real-time previews as our AI brings your vision to life.",
  },
  {
    title: "Fully Customizable",
    description:
      "Once your site is generated, easily tweak colors, layouts, and content.",
  },
];

export const Features = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">
          Everything you need
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center mt-5 text-xl text-white/70">
            Speak your vision, and our AI will create a stunning, 
            fully-functional website for you in minutes—no coding, 
            no design skills required.
          </p>
        </div>
        <div className="mt-16 flex flex-col sm:flex-row gap-4  ">
          {features.map(({ title, description }) => (
           <Feature title={title} description={description} key={title} />
          ))}
        </div>
      </div>
    </div>
  );
};
