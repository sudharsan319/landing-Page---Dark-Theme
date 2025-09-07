export const Banner = () => {
  return (
    <div className="py-1.5 text-center bg-gradient-to-r from-teal-400 to-yellow-200">
      <div className="container">
        <p className="font-medium">
          <span className="hidden sm:inline">
            Your Website, Your Voice. - {" "}
          </span>
          <a href="#" className="underline underline-offset-4 font-medium">
            Explore the demo
          </a>
        </p>
      </div>
    </div>
  );
};
