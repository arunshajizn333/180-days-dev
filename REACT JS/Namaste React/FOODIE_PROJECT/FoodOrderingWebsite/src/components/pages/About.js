import React from "react";

const About = () => (
  <main className="w-[min(100%_-_48px,_980px)] max-md:w-[min(100%_-_32px,_980px)] mx-auto pt-14 pb-24 max-md:pt-8 max-md:pb-16">
    {/* Page Hero */}
    <section className="relative overflow-hidden bg-white border border-[#eceef2] rounded-3xl px-12 py-14 max-md:px-6 max-md:py-8 shadow-[0_12px_36px_rgba(24,28,36,0.04)]">
      <p className="mb-3.5 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#ff5200]">
        About Foodie
      </p>
      <h1 className="max-w-[680px] mb-4 text-[clamp(32px,5vw,48px)] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#1a1a1a]">
        Good food brings us together.
      </h1>
      <p className="max-w-[680px] text-base text-[#727782] leading-[1.8]">
        We make it easy to discover great local restaurants and enjoy the food
        you love, delivered fast and fresh right to your door.
      </p>

      {/* Decorative emoji — replaces .page-hero::after */}
      <span
        className="absolute right-10 bottom-[30px] text-[110px] leading-none opacity-[0.12] select-none pointer-events-none"
        aria-hidden="true"
      >
        🍲
      </span>
    </section>

    {/* Our Story Section */}
    <section className="mt-7 bg-white border border-[#eceef2] rounded-[20px] px-12 py-10 max-md:px-6 max-md:py-8 shadow-[0_6px_20px_rgba(0,0,0,0.02)]">
      <h2 className="mb-3.5 text-[26px] font-extrabold text-[#1a1a1a] tracking-[-0.4px]">
        Our story
      </h2>
      <p className="max-w-[680px] text-base text-[#727782] leading-[1.8]">
        Foodie connects hungry people with the kitchens and neighbourhood
        favourites that make every meal special. Browse nearby restaurants,
        find something new, and let us take care of getting it to you.
      </p>

      {/* Stats Row */}
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-5 max-md:gap-3 mt-7">
        <div className="bg-[#fdfaf7] border border-[#f3ebe1] p-6 rounded-2xl text-center">
          <span className="block text-[32px] font-extrabold text-[#ff5200]">
            500+
          </span>
          <span className="block mt-1 text-[13px] font-semibold text-[#4b515d]">
            Partner Restaurants
          </span>
        </div>

        <div className="bg-[#fdfaf7] border border-[#f3ebe1] p-6 rounded-2xl text-center">
          <span className="block text-[32px] font-extrabold text-[#ff5200]">
            30 Mins
          </span>
          <span className="block mt-1 text-[13px] font-semibold text-[#4b515d]">
            Average Delivery Time
          </span>
        </div>

        <div className="bg-[#fdfaf7] border border-[#f3ebe1] p-6 rounded-2xl text-center">
          <span className="block text-[32px] font-extrabold text-[#ff5200]">
            100K+
          </span>
          <span className="block mt-1 text-[13px] font-semibold text-[#4b515d]">
            Happy Food Lovers
          </span>
        </div>
      </div>
    </section>
  </main>
);

export default About;
