"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

const links = [
  { href: "/journal", label: "Journaling" },
  { href: "/sleep", label: "Sleep Personas" },
  { href: "/drawing", label: "Reflection" },
  { href: "/insights", label: "Insights" },
  { href: "/sounds", label: "Calm" },
];

const containerVariants : Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Navigation() {
  return (
    <nav className="app-nav">
      <motion.div
        className="app-nav__header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/" className="app-nav__logo">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            ◯ ECHOLOOP
          </motion.span>
        </Link>
      </motion.div>
      
      <p className="app-nav__label">Explore</p>
      <motion.ul
        className="app-nav__list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {links.map((link) => (
          <motion.li key={link.href} variants={itemVariants}>
            <Link href={link.href} className="app-nav__link">
              <motion.span
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {link.label}
              </motion.span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  );
}
