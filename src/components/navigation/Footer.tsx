import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Project", href: "#project" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
];

export default function Footer() {
  return (
    <footer
      className="relative flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-12 md:px-16 md:py-16"
      style={{ backgroundColor: "var(--hitam)", color: "var(--putih)" }}
    >
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-between">
        {/* Baris Atas */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          >
            Lets Work Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-xs text-right text-xs font-light leading-relaxed text-neutral-300 sm:text-sm md:self-start"
          >
            I'm always interested in hearing about new opportunities and
            projects.
          </motion.p>
        </div>

        {/* Baris Bawah */}
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          {/* Menu Navigasi */}
          <motion.ul
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 sm:gap-3"
          >
            {navLinks.map((link, index) => (
              <li key={index}>
                <motion.a
                  href={link.href}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block text-2xl font-normal text-neutral-300 transition-colors hover:text-white sm:text-3xl md:text-4xl"
                >
                  {link.name}
                </motion.a>
              </li>
            ))}
          </motion.ul>

          {/* Info Kontak & Sosial Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-4 text-right md:items-end"
          >
            <a
              href="mailto:Example@gmail.com"
              className="group inline-flex items-center gap-3 text-lg font-light text-neutral-200 transition-opacity hover:opacity-80 sm:text-xl md:text-2xl"
            >
              <span>jhoifhawinola@gmail.com</span>
              <svg
                className="h-6 w-6 transition-transform group-hover:scale-110"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                width="4"
                height="12"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="currentColor"
                  d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"
                />
              </svg>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-lg font-light text-neutral-200 transition-opacity hover:opacity-80 sm:text-xl md:text-2xl"
            >
              <span>Example</span>
              {/* SVG LinkedIn */}
              <svg
                className="h-6 w-6 transition-transform group-hover:scale-110"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                width="4"
                height="12"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="currentColor"
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
