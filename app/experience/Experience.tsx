import experience from "@/data/experience";

const Experience = () => {


  return (
    <div className="flex flex-col items-center justify-center w-full">
      {[...experience].reverse().map((exp) => (
        <div
          key={`${exp.title}-${exp.date}`}
          className="my-5 flex flex-col md:flex-row justify-between w-full md:items-start items-center md:p-10 gap-3"
        >
          <h2 className="drop-shadow-glowLight text-2xl md:text-3xl font-semibold">
            {exp.title}
          </h2>

          <div className="md:w-[400px] text-center md:text-left">
            <p className="text-xl font-medium">{exp.role}</p>
            <p className="text-gray-500 text-xs md:text-sm">{exp.date}</p>
            <p className="text-gray-500 text-sm md:text-base mt-2">
              {exp.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
