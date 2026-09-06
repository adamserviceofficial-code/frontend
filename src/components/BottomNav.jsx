// ─────────────────────────────────────────────────────────────────────────────
// BottomNav Component - Modern Fixed Bottom Navigation for Mobile
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiHomeAlt2, BiSolidMovie, BiLibrary } from "react-icons/bi";
import { BsTv } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { PiHeartFill } from "react-icons/pi";
import { MdMoreVert } from "react-icons/md";
import { VscClose } from "react-icons/vsc";

export default function BottomNav({ onSearchClick }) {
  const location = useLocation();
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Determine active nav item based on current location
  const getActiveItem = () => {
    const path = location.pathname;
    if (path === "/") return "Home";
    if (path.startsWith("/mov") || path.startsWith("/movies")) return "Movies";
    if (path.startsWith("/ser") || path.startsWith("/series")) return "Series";
    if (path.startsWith("/search")) return "Search";
    if (path.startsWith("/watchlist") || path.startsWith("/collections")) return "More";
    return "Home";
  };

  const activeItem = getActiveItem();

  // Navigation items for bottom bar
  const navItems = [
    { id: "home", icon: BiHomeAlt2, label: "Home", path: "/" },
    { id: "movies", icon: BiSolidMovie, label: "Movies", path: "/movies" },
    { id: "series", icon: BsTv, label: "Series", path: "/series" },
    { id: "search", icon: FiSearch, label: "Search", path: null, onClick: onSearchClick },
  ];

  // More menu items
  const moreMenuItems = [
    { icon: BiLibrary, label: "Collections", path: "/collections" },
    { icon: PiHeartFill, label: "Watchlist", path: "/watchlist" },
  ];

  return (
    <>
      {/* Fixed Bottom Navigation Bar - Mobile Only */}
      <div className="fixed md:hidden bottom-0 left-0 right-0 z-30 bg-btnColor/80 backdrop-blur-md border-t border-secondaryTextColor/10 shadow-2xl pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
        <div className="flex items-center justify-between px-2">
          {/* Main Navigation Items */}
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path || "#"}
              onClick={(e) => {
                if (!item.path) {
                  e.preventDefault();
                  item.onClick?.();
                  setMoreMenuOpen(false);
                }
              }}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 flex-1 ${
                activeItem === item.label
                  ? "text-otherColor scale-110"
                  : "text-secondaryTextColor hover:text-primaryTextColor"
              }`}
            >
              <item.icon className="text-2xl mb-1" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {item.label}
              </span>
            </Link>
          ))}

          {/* More Menu Button */}
          <div className="relative flex-1">
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 w-full ${
                moreMenuOpen || activeItem === "More"
                  ? "text-otherColor scale-110"
                  : "text-secondaryTextColor hover:text-primaryTextColor"
              }`}
            >
              <MdMoreVert className="text-2xl mb-1" />
              <span className="text-xs font-bold uppercase tracking-wider">
                More
              </span>
            </button>

            {/* More Menu Dropdown */}
            <AnimatePresence>
              {moreMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ type: "tween", duration: 0.2 }}
                  className="absolute bottom-full mb-2 right-0 bg-btnColor border border-secondaryTextColor/20 rounded-2xl shadow-2xl overflow-hidden w-56 origin-bottom-right"
                >
                  <div className="divide-y divide-secondaryTextColor/10">
                    {moreMenuItems.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        className={`flex items-center gap-4 px-4 py-3 transition-all duration-200 ${
                          activeItem === item.label
                            ? "bg-otherColor/10 text-otherColor"
                            : "text-primaryTextColor hover:bg-bgColorSecondary"
                        }`}
                        onClick={() => setMoreMenuOpen(false)}
                      >
                        <item.icon className="text-xl shrink-0" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setMoreMenuOpen(false)}
                    className="absolute top-2 right-2 p-1 text-secondaryTextColor hover:text-primaryTextColor hover:bg-bgColorSecondary rounded-lg transition-colors"
                  >
                    <VscClose className="text-lg" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Backdrop to close menu on tap outside - Mobile Only */}
      <AnimatePresence>
        {moreMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMoreMenuOpen(false)}
            className="fixed md:hidden bottom-20 left-0 right-0 top-0 z-20"
          />
        )}
      </AnimatePresence>
    </>
  );
}
