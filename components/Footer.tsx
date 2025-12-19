import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-base-200 via-base-200/70 to-base-100 text-base-content">
      <div className="mx-auto w-full md:w-5/6 lg:w-4/5 px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-base-100/70 p-2 shadow-inner">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className="fill-current"
                >
                  <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Rialo Builder Hub</h2>
                <p className="text-xs uppercase tracking-widest text-base-content/60">
                  Community Showcase
                </p>
              </div>
            </div>
            <p className="text-sm text-base-content/70">
              Discover, share, and celebrate projects built by the Rialo
              community. Built for builders who want to ship faster.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-outline">Builders</span>
              <span className="badge badge-outline">Open Source</span>
              <span className="badge badge-outline">Web3</span>
            </div>
          </div>

          <nav className="space-y-3">
            <h6 className="text-sm font-semibold uppercase tracking-widest text-base-content/60">
              Explore
            </h6>
            <div className="flex flex-col gap-2 text-sm">
              <a className="link link-hover">All Projects</a>
              <a className="link link-hover">Categories</a>
              <a className="link link-hover">Top Builders</a>
              <a className="link link-hover">Submit a Build</a>
            </div>
          </nav>

          <nav className="space-y-3">
            <h6 className="text-sm font-semibold uppercase tracking-widest text-base-content/60">
              Community
            </h6>
            <div className="flex flex-col gap-2 text-sm">
              <a className="link link-hover">About Rialo</a>
              <a className="link link-hover">Docs</a>
              <a className="link link-hover">Events</a>
              <a className="link link-hover">Contact</a>
            </div>
          </nav>

          <nav className="space-y-3">
            <h6 className="text-sm font-semibold uppercase tracking-widest text-base-content/60">
              Legal
            </h6>
            <div className="flex flex-col gap-2 text-sm">
              <a className="link link-hover">Terms</a>
              <a className="link link-hover">Privacy</a>
              <a className="link link-hover">Cookies</a>
            </div>
          </nav>
        </div>
      </div>

      <div className="border-t border-base-300/60">
        <div className="mx-auto w-full md:w-5/6 lg:w-4/5 px-6 py-4 text-sm text-base-content/60 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Rialo Builder Hub. All rights reserved.</span>
          <span>Built with Rialo • Crafted by the community</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
