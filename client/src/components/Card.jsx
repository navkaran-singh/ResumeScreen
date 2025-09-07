import React from "react";

const Card = ({ img, para, heading, id }) => {
  return (
    <div
      key={id}
      className="flex flex-col sm:h-auto md:h-48 lg:h-72 rounded-xl bg-slate-50 p-4 shadow-sm hover:shadow-blue-200 hover:shadow-lg hover:ring-1 hover:ring-blue-50 cursor-pointer"
    >
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
        <img className="w-6 h-6" src={img} alt={heading} />
      </div>

      <h2 className="text-start font-medium text-lg mb-4">{heading}</h2>
      <p className="text-start text-gray-600">{para}</p>
    </div>
  );
};

export default Card;
