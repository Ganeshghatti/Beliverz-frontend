import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Category() {
  const initailly_having_only_one_course = useSelector(
    (state) => state.category.categories[0]
  );
  let category = [];
  if (initailly_having_only_one_course) {
    category.push(initailly_having_only_one_course);
    console.log(category);
  }

  return category && category.length > 0 ? (
    <section
      id="category"
      className="w-full py-24 items-center justify-center flex"
    >
      <div className="flex flex-col gap-2 custom-width-88 md:items-center">
        <p
          className="text-5xl md:text-4xl font-medium text-black2 md:text-center"
          style={{ letterSpacing: "-1.12px", lineHeight: "normal" }}
        >
          Most Popular{" "}
          <span className="text-blue font-medium">Course Categories</span>
        </p>
        <p className="text-lg text-black3 md:text-base md:text-center">
          Various versions have evolved over the years, sometimes by accident,
        </p>
        <div className="flex flex-wrap md:flex-col w-full mt-12 justify-between gap-y-32 lg:gap-y-16 md:gap-y-8 md:items-center">
          {category.map((item, index) => (
            <div className="home-category-card md:w-full relative">
              <Link to="/#courses">
                <div className="home-category-card-gradient absolute w-full h-full" />
                {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="36"
                viewBox="0 0 35 36"
                fill="none"
                className="absolute right-6 top-6"
              >
                <rect
                  y="0.0908203"
                  width="35"
                  height="35"
                  rx="17.5"
                  fill="#5A81EE"
                />
                <rect
                  y="0.0908203"
                  width="35"
                  height="35"
                  rx="17.5"
                  stroke="white"
                />
                <path
                  d="M22.4184 11.2827L23.5746 17.8397C23.6111 18.0544 23.5616 18.2749 23.4367 18.4532C23.3118 18.6316 23.1216 18.7536 22.9073 18.7927C22.4641 18.8708 22.0326 18.5687 21.9544 18.1254L21.1432 13.5248L14.7289 22.6854C14.4708 23.054 13.9511 23.1456 13.5825 22.8875C13.214 22.6294 13.1223 22.1097 13.3804 21.7412L19.7947 12.5806L15.1941 13.3918C14.7508 13.4699 14.3193 13.1678 14.2412 12.7246C14.2008 12.4953 14.2574 12.2804 14.377 12.1096C14.4966 11.9388 14.6791 11.8121 14.9084 11.7716L21.4655 10.6154C21.6803 10.5777 21.9013 10.6268 22.08 10.7519C22.2587 10.877 22.3804 11.0679 22.4184 11.2827Z"
                  fill="white"
                />
              </svg> */}
                <img
                  src={item.categoryImg}
                  className="object-cover w-full h-full"
                />
                <p className="text-3xl text-white md:text-2xl absolute bottom-4 text-center left-1/2 w-full transform -translate-x-1/2 font-medium uppercase ">
                  {item.categoryName}
                </p>{" "}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : (
    ""
  );
}
