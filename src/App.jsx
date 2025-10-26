import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Matter from "matter-js";

/**
 * Neon Portfolio Website — BALAKRISHNAN RAVIKUMAR
 * Stack: React + Tailwind CSS + Framer Motion + Matter.js
 *
 * Features:
 * - Dark/light toggle
 * - Hero/Profile with socials
 * - Skills bubbles with physics (Matter.js)
 * - Projects 3D carousel (curved, swipe/drag)
 * - Experience hanging cards (dot centered, year to right)
 * - Education timeline (zigzag, neon line)
 * - Contact form + socials (Now with Formspree integration)
 * - Back to top button
 */

const MENU = [
  { label: "Home", target: "home" },
  { label: "Skills", target: "skills" },
  { label: "Projects", target: "projects" },
  { label: "Experience", target: "experience" },
  { label: "Education", target: "education" },
  { label: "Contact", target: "contact" },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    // UPDATED LINKEDIN URL
    href: "https://www.linkedin.com/in/balakrishnan-ravikumar-8790732b6",
    icon: (props) => (
      <svg viewBox="0 0 24 24" {...props}>
        <path
          d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.18h.06c.5-.94 1.72-1.93 3.54-1.93C20.46 8.25 22 10.23 22 13.58V24h-5v-9c0-2.15-.77-3.62-2.69-3.62-1.47 0-2.35.99-2.73 1.94-.14.34-.17.82-.17 1.31V24H7.5V8z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "GitHub",
    // UPDATED GITHUB URL
    href: "https://github.com/BalakrishnanCodeSpace",
    icon: (props) => (
      <svg viewBox="0 0 24 24" {...props}>
        <path
          d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.8-.25.8-.56v-1.95c-3.2.7-3.87-1.37-3.87-1.37-.52-1.3-1.27-1.65-1.27-1.65-1.04-.71.08-.7.08-.7 1.16.09 1.77 1.2 1.77 1.2 1.02 1.75 2.67 1.24 3.32.95.1-.75.4-1.24.72-1.52-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.47.12-3.07 0 0 .98-.31 3.2 1.18.93-.26 1.93-.39 2.93-.39 1 0 2 .13 2.93.39 2.22-1.49 3.2-1.18 3.2-1.18.64 1.6.24 2.78.12 3.07.75.81 1.2 1.84 1.2 3.1 0 4.42-2.69 5.38-5.25 5.66.41.36.77 1.06.77 2.14v3.18c0 .31.22.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Email",
    // UPDATED EMAIL LINK & ADDRESS
    href: "mailto:alab2252@gmail.com",
    email: "alab2252@gmail.com", // Store email here for easy reference in Contact component
    icon: (props) => (
      <svg viewBox="0 0 24 24" {...props}>
        <path
          d="M2 4h20a2 2 0 0 1 2 2v.4l-12 7.2L0 6.4V6a2 2 0 0 1 2-2zm0 6.7L12 16.7 22 10.7V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.3z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

const SKILLS = [
  // Programming & Tools - Now split into individual libraries
  { name: "Python", level: 100, color: "from-cyan-400 to-blue-500" },
  { name: "Pandas", level: 95, color: "from-cyan-400 to-blue-500" },
  { name: "NumPy", level: 92, color: "from-cyan-400 to-blue-500" },
  { name: "Seaborn", level: 90, color: "from-cyan-400 to-blue-500" },
  { name: "Plotly", level: 88, color: "from-cyan-400 to-blue-500" },
  { name: "Scikit-learn", level: 94, color: "from-cyan-400 to-blue-500" },
  { name: "Matplotlib", level: 90, color: "from-cyan-400 to-blue-500" },

  { name: "SQL", level: 90, color: "from-cyan-400 to-blue-500" },
  { name: "DAX", level: 85, color: "from-cyan-400 to-blue-500" },
  { name: "Power BI", level: 90, color: "from-cyan-400 to-blue-500" },
  { name: "QlikView", level: 70, color: "from-cyan-400 to-blue-500" },
  { name: "MS Excel", level: 95, color: "from-cyan-400 to-blue-500" },
  { name: "MS Access", level: 75, color: "from-cyan-400 to-blue-500" },

  // Databases
  { name: "MongoDB", level: 80, color: "from-green-400 to-emerald-500" },
  { name: "Oracle", level: 85, color: "from-green-400 to-emerald-500" },
  { name: "MySQL", level: 88, color: "from-green-400 to-emerald-500" },

  // Analytics & ML
  { name: "Descriptive Stats", level: 90, color: "from-fuchsia-400 to-pink-500" },
  { name: "Probability", level: 85, color: "from-fuchsia-400 to-pink-500" },
  { name: "Hypothesis Testing", level: 80, color: "from-fuchsia-400 to-pink-500" },
  { name: "Feature Engineering", level: 80, color: "from-fuchsia-400 to-pink-500" },
  { name: "Model Evaluation", level: 85, color: "from-fuchsia-400 to-pink-500" },
  { name: "PyTorch", level: 70, color: "from-fuchsia-400 to-pink-500" },
  { name: "TensorFlow (basics)", level: 65, color: "from-fuchsia-400 to-pink-500" },

  // AI & LLM Development
  { name: "LangChain", level: 75, color: "from-violet-400 to-purple-500" },
  { name: "RAG Pipelines", level: 70, color: "from-violet-400 to-purple-500" },
  { name: "Embeddings", level: 80, color: "from-violet-400 to-purple-500" },
  { name: "Vector Databases", level: 70, color: "from-violet-400 to-purple-500" },

  // Business & Documentation
  { name: "BRD Documentation", level: 90, color: "from-amber-400 to-orange-500" },
  { name: "Requirement Gathering", level: 88, color: "from-amber-400 to-orange-500" },
  { name: "Agile Collaboration", level: 85, color: "from-amber-400 to-orange-500" },
];


const PROJECTS = [
  {
    title: "AI Resume & Job Description Analyzer (RAG Project)",
    image:
      "https://raw.githubusercontent.com/BalaKrishnanCodeSpace/website_portfolio/48dce3575538874eec623e77bca73b3ba14f6a43/Images/AI%20Resume%20%26%20Job%20Description%20Analyzer%20(RAG%20Project).png",
    description:
      "Developed an AI-powered RAG system to match resumes with job descriptions, highlighting skills, gaps, and actionable improvement suggestions.",
    url: "https://github.com/BalaKrishnanCodeSpace/AI-Resume-Job-Description-Analyzer-RAG-Project-",
  },
  {
    title: "Industrial Copper Modeling",
    image:
      "https://raw.githubusercontent.com/BalaKrishnanCodeSpace/website_portfolio/48dce3575538874eec623e77bca73b3ba14f6a43/Images/Industrial%20Copper%20Modeling.png",
    description:
      "Built regression and classification models to predict industrial copper prices and lead status, with an interactive Streamlit app for real-time insights",
    url: "https://github.com/BalaKrishnanCodeSpace/Industrial-Copper-Modeling",
  },
  {
    title: "Airbnb Analysis",
    image:
      "https://raw.githubusercontent.com/BalaKrishnanCodeSpace/website_portfolio/48dce3575538874eec623e77bca73b3ba14f6a43/Images/Airbnb%20Analysis.png",
    description:
      "Developed an interactive Streamlit application to analyze Airbnb data, uncover pricing trends, availability patterns, and location-driven insights for data-driven decision-making",
    url: "https://github.com/BalaKrishnanCodeSpace/Airbnb_Analysis",
  },
  {
    title: "Time Series Forecasting using ARIMA, SARIMA & Prophet",
    image:
      "https://raw.githubusercontent.com/BalaKrishnanCodeSpace/website_portfolio/48dce3575538874eec623e77bca73b3ba14f6a43/Images/Time%20Series%20Forecasting%20using%20ARIMA%2C%20SARIMA%20%26%20Prophet.png",
    description:
      "Built and compared ARIMA, SARIMA, and Prophet models to forecast airline passenger traffic, analyzing trends, seasonality, and model performance for accurate predictions",
    url: "https://github.com/BalaKrishnanCodeSpace/Time-Series-Forecasting-using-ARIMA-SARIMA-Prophet",
  },
  {
    title: "Singapore House Price Prediction",
    image:
      "https://raw.githubusercontent.com/BalaKrishnanCodeSpace/website_portfolio/48dce3575538874eec623e77bca73b3ba14f6a43/Images/Singapore%20House%20Price%20Prediction.png",
    description:
      "Developed a machine learning model and Streamlit app to predict Singapore resale flat prices, enabling users to make informed real estate decisions.",
    url: "https://github.com/BalaKrishnanCodeSpace/Singapore-Resale-Flat-Prices-Predicting",
  },
];

const EXPERIENCE = [
  {
    title: "Lead Business Analyst",
    company: "Royal Sundaram Insurance Company",
    duration: "2016 — Present",
    summary: [
      "Part of Agile 'Squad' model; responsible for analytics, reporting, requirement documentation, and ETL processes.",
      "Gathered requirements from Legal Team and authored BRDs, facilitating smooth handoff to the BA for developer implementation.",
      "Designed and deployed advanced Power BI dashboards for Legal TP and Ombudsman domains, increasing report adoption by 25%.",
      "Automated regulatory reporting for IRDA, IIB, and XOL, reducing manual effort by 35% and ensuring 100% compliance.",
      "Optimized SQL queries and DAX measures, cutting dashboard refresh times by 50%.",
      "Delivered executive-ready ad-hoc reports, supporting strategic decision-making.",
      "Identified 15% cost-saving opportunities in Motor TP claims via deep data analysis and DAX modeling.",
      "Developed and streamlined multi-source ETL pipelines using SSIS, improving data ingestion and cleaning messy datasets by 20%."
    ]
  },
  {
    title: "Senior Process Analyst",
    company: "Tata Consultancy Services",
    duration: "2012 — 2016",
    summary:
      "MIS Reporting and data consolidation for global operations teams",
  },
  {
    title: "Executive - Operations",
    company: "VKC Credit and Forex Services Ltd",
    duration: "2010 — 2012",
    summary:
      "Managed end-to-end processing of forex card operations with a focus on MIS reporting and compliance.",
  },
];

const EDUCATION = [
  {
    institution: "Annamali University",
    degree: "M.Sc. in Computer Science",
    duration: "2023 — Present",
    /*details: "Algorithms, databases, statistics; hands-on projects.",*/
  },
  {
    institution: "HCL Guvi Geek Network Private Limited",
    degree: "Data Science",
    duration: "2023 — 2024",
    /*details: "Advanced analytics, decision science, and business communication.",*/
  },
  {
    institution: "Kumararani Meena Muthiah College",
    degree: "B.Sc. in Computer Science",
    duration: "2006 — 2009",
    /*details: "Advanced analytics, decision science, and business communication.",*/
  },

];

/* ---------- Utility styles ---------- */
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const glassPanel =
  "backdrop-blur-md bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/10";
const neonText =
  "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]";
const neonRing =
  "ring-1 ring-cyan-400/40 shadow-[0_0_20px_4px_rgba(34,211,238,0.15)]";
const neonHover =
  "transition-all duration-300 hover:text-cyan-300 hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]";

/* ---------- App ---------- */
const App = () => {
  const [theme, setTheme] = useState("dark");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [showTop]);

  const gradientBg = useMemo(
    () =>
      "bg-[#0b0f1a] dark:bg-[#060913] relative min-h-screen overflow-x-hidden",
    []
  );

  return (
    <div className={`${gradientBg} text-slate-200`}>
      <BackgroundDecor />
      <Header theme={theme} setTheme={setTheme} />

      <main className="pt-20">
        <Section id="home">
          <Hero />
        </Section>

        <Divider />
        <Section id="skills" title="Skills">
          <SkillsBubblesPhysics />
        </Section>

        <Divider />
        <Section id="projects" title="Projects">
          <ProjectsCarousel3D />
        </Section>

        <Divider />
        <Section id="experience" title="Experience">
          <ExperienceHanging />
        </Section>

        <Divider />
        <Section id="education" title="Education">
          <EducationTimeline />
        </Section>

        <Divider />
        <Section id="contact" title="Contact">
          {/* Contact component is updated to handle form submission via fetch */}
          <Contact /> 
        </Section>
      </main>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full ${glassPanel} ${neonRing} text-sm font-medium text-cyan-300 hover:text-cyan-200`}
          >
            ↑ Back to top
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="mt-24 pb-12 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} BALAKRISHNAN RAVIKUMAR • All rights reserved
      </footer>
    </div>
  );
};

/* ---------- Background ---------- */
const BackgroundDecor = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
    <div className="absolute -top-40 -left-40 w-[50vw] h-[50vw] rounded-full blur-3xl bg-cyan-500/10"></div>
    <div className="absolute -bottom-40 -right-10 w-[40vw] h-[40vw] rounded-full blur-3xl bg-fuchsia-500/10"></div>
    <ParticleField />
  </div>
);

const ParticleField = () => {
  const dots = Array.from({ length: 60 }, (_, i) => i);
  return (
    <svg className="absolute inset-0 w-full h-full">
      {dots.map((i) => {
        const x = (i * 137.5) % 100;
        const y = (i * 97.3) % 100;
        return (
          <motion.circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r="1.2"
            fill="rgba(147,51,234,0.25)"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.1, 0.6, 0.2], y: [0, -2, 0] }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 10) * 0.2,
            }}
          />
        );
      })}
    </svg>
  );
};

/* ---------- Header ---------- */
const Header = ({ theme, setTheme }) => (
  <header className={`fixed top-0 left-0 right-0 z-40 ${glassPanel}`}>
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
      <div className="w-24 h-8 flex items-center">
        <span className={`text-xs tracking-widest ${neonText}`}> </span>
      </div>
      <ul className="flex items-center gap-2 md:gap-4">
        {MENU.map((item) => (
          <li key={item.target}>
            <button
              onClick={() =>
                document.getElementById(item.target)?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className={`px-3 py-2 text-sm md:text-base font-medium text-slate-300 ${neonHover}`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </nav>
  </header>
);

const ThemeToggle = ({ theme, setTheme }) => {
  const isDark = theme === "dark";
  return (
    <button
      aria-label="Toggle dark mode"
      className={`relative w-12 h-6 rounded-full ${glassPanel} ${neonRing} flex items-center px-1`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <motion.span
        layout
        className={`absolute top-1 left-1 w-4 h-4 rounded-full ${
          isDark ? "bg-cyan-400" : "bg-yellow-300"
        }`}
        style={{ x: isDark ? 0 : 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </button>
  );
};

/* ---------- Section ---------- */
const Section = ({ id, title, children }) => (
  <section id={id} className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
    {title && (
      <>
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className={`text-2xl md:text-3xl font-bold text-center ${neonText}`}
        >
          {title}
        </motion.h2>
        {/* Default spacer */}
        <div className="h-8 md:h-12" />
        {/* Extra spacer only for Experience */}
        {id === "experience" && <div className="h-8 md:h-12" />}
      </>
    )}
    {children}
  </section>
);

const Divider = () => (
  <div className="mx-auto max-w-7xl px-4 md:px-6">
    <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
  </div>
);

/* ---------- Hero/Profile ---------- */
const Hero = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div className={`flex flex-col items-center gap-6 ${glassPanel} p-6 rounded-2xl ${neonRing}`}>
      <div className="relative w-44 h-44 rounded-full overflow-hidden ring-2 ring-cyan-400/50">
      <img
        src="https://raw.githubusercontent.com/BalaKrishnanCodeSpace/website_portfolio/e0d88ca217a5d429fcf2e5548420ffd26c257d02/Images/My_Photo.png"
        alt="Portrait"
        className="w-full h-full object-contain bg-black/10"
      />
      </div>
      <div className="flex items-center gap-4">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full ${glassPanel} ${neonRing} ${neonHover}`}
            aria-label={s.label}
          >
            {s.icon({
              className: "w-5 h-5 text-slate-200 transition-colors duration-300",
            })}
          </a>
        ))}
      </div>
    </div>

    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="space-y-4"
    >
      <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight ${neonText}`}>
        BALAKRISHNAN RAVIKUMAR
      </h1>
      <p className="text-lg md:text-xl font-semibold text-cyan-300">
        DATA ANALYST & BUSINESS ANALYST
      </p>
      <p className={`text-sm md:text-base leading-relaxed ${glassPanel} p-4 rounded-xl`}>
		 Results-driven <strong>Data Analyst &amp; BI Developer</strong> with 14+ years of experience, 
		 including 4+ years in analytics, reporting, and BI within the insurance domain. Skilled in 
		 <strong> Power BI, SQL, QlikView, and SSIS, delivering dashboards, reporting automation, ETL pipelines</strong>. 
		 Proven record of optimizing reporting processes, enhancing data quality, and driving cost savings through analysis. 
		 Additionally trained in machine learning, deep learning (CNN/RNN), and RAG pipelines, with project exposure to predictive modeling.
      </p>
    </motion.div>
  </div>
);

/* ---------- Skills Bubbles with Physics (Consolidated) ---------- */
const SkillsBubblesPhysics = () => {
  const containerRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();

    // Wall thickness used for placement calculation
    const wallThickness = 40;

    // 1. Initialize Matter.js Engine with zero gravity
    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0 } });
    const world = engine.world;

    // Walls (Static bodies to contain the bubbles)
    const wallOptions = { isStatic: true, restitution: 1.0, frictionAir:0, friction: 0, density:0.01}; // Added restitution 1.0 for perfect bounce

    const walls = [
      // Top Wall: Center is half the thickness above the visible edge (y=-20)
      Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { ...wallOptions, label: 'WallTop' }),
      // Bottom Wall: Center is half the thickness below the visible edge (y=height + 20)
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { ...wallOptions, label: 'WallBottom' }),
      // Left Wall: Center is half the thickness left of the visible edge (x=-20)
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { ...wallOptions, label: 'WallLeft' }),
      // Right Wall: Center is half the thickness right of the visible edge (x=width + 20)
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { ...wallOptions, label: 'WallRight' }),
    ];
    Matter.World.add(world, walls);

    const bodies = SKILLS.map((skill) => {
      // Radius calculation: 20px minimum + (level / 100) * 30px
      const radius = 20 + (skill.level / 100) * 30;
      const body = Matter.Bodies.circle(
        // Random placement within bounds (x and y must be at least 'radius' away from edge)
        Math.random() * (width - radius * 2) + radius,
        Math.random() * (height - radius * 2) + radius,
        radius,
        { 
          restitution: 0.9, // Slight increase in bounciness for bodies too
          frictionAir: 0.005, 
          friction: 0.01,
          density: 0.01 
        }
      );
      
      // Initial velocity to kickstart movement
      Matter.Body.setVelocity(body, { 
        x: (Math.random() - 0.5) * 10, 
        y: (Math.random() - 0.5) * 10  
      });

      body.label = skill.name;
      body.radius = radius;
      body.color = skill.color;
      return body;
    });

    Matter.World.add(world, bodies);

    // Function to apply a small, continuous jitter force
    const jitter = () => {
      const minForceMagnitude = 0.000005;
      const maxForceMagnitude = 0.00001;

      bodies.forEach(body => {
        // Apply a tiny random force to keep the movement perpetual
        const forceMagnitude = (Math.random() * (maxForceMagnitude - minForceMagnitude) + minForceMagnitude) * body.mass;
        const forceX = (Math.random() - 0.5) * forceMagnitude; 
        const forceY = (Math.random() - 0.5) * forceMagnitude;
        Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
      });
    };
    
    // Add the jitter function to run on every physics update step
    const jitterEvent = Matter.Events.on(engine, 'beforeUpdate', jitter);


    // 2. Add Mouse Constraint for Interaction (Touch/Click/Drag)
    const mouse = Matter.Mouse.create(containerRef.current);
    mouse.pixelRatio = window.devicePixelRatio; // Adjust for high-res displays
    
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false // Make the constraint line invisible
        }
      }
    });

    Matter.World.add(world, mouseConstraint);


    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    const update = () => {
      setBubbles(
        bodies.map((b) => ({
          x: b.position.x,
          y: b.position.y,
          r: b.radius,
          name: b.label,
          color: b.color,
        }))
      );
      // Only request next frame if the container is still mounted
      if (containerRef.current) {
        requestAnimationFrame(update);
      }
    };
    const animFrame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animFrame);
      Matter.Events.off(engine, 'beforeUpdate', jitter); // Cleanup event listener
      Matter.World.remove(world, mouseConstraint); // Cleanup mouse constraint
      Matter.World.clear(world, true);
      Matter.Engine.clear(engine);
      Matter.Runner.stop(runner);
    };
  }, []); // Empty dependency array as it uses the constant SKILLS

  return (
    <div
      ref={containerRef}
      className={`relative ${glassPanel} rounded-2xl p-2 ${neonRing} h-[600px] overflow-hidden`}
    >
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute flex items-center justify-center"
          style={{
            left: b.x - b.r,
            top: b.y - b.r,
            width: b.r * 2,
            height: b.r * 2,
            borderRadius: "50%",
            // 3D effect: Shadow to lift the bubble off the background
            boxShadow: `0 0 ${b.r * 0.5}px rgba(34, 211, 238, 0.4)`, 
            pointerEvents: 'none' // Important: Allow mouse constraint to detect underlying canvas area
          }}
        >
          {/* Inner div applies the gradient, text styles, and necessary wrapping properties */}
          <div
            className={`w-full h-full rounded-full flex items-center justify-center text-[10px] md:text-xs text-white font-semibold text-center bg-gradient-to-br ${b.color}`}
            style={{
              // Visual 3D effect: Radial gradient for sphere shading
              background: `radial-gradient(circle at 70% 30%, rgba(255,255,255,0.4), transparent 50%), linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))`,
              // Dynamic padding and wrapping for text fit
              padding: b.r * 0.3, 
              lineHeight: 1.2, 
              wordBreak: 'break-word',
            }}
          >
            {b.name}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---------- Projects: 3D curved carousel with swipe/drag ---------- */
const ProjectsCarousel3D = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % PROJECTS.length);
  const prev = () => setIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  const handleDragEnd = (_e, info) => {
    if (info.offset.x < -50) next();
    if (info.offset.x > 50) prev();
  };

  const getTransform = (i) => {
    const offset = (i - index + PROJECTS.length) % PROJECTS.length;
    if (offset === 0)
      return { scale: 1.12, x: 0, rotateY: 0, zIndex: 30, opacity: 1 };
    if (offset === 1 || offset === PROJECTS.length - 1)
      return {
        scale: 0.9,
        x: offset === 1 ? 260 : -260,
        rotateY: offset === 1 ? -25 : 25,
        zIndex: 20,
        opacity: 0.85,
      };
    return {
      scale: 0.78,
      x: offset < PROJECTS.length / 2 ? 420 : -420,
      rotateY: offset < PROJECTS.length / 2 ? -45 : 45,
      zIndex: 10,
      opacity: 0.6,
    };
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative h-[460px] w-full flex items-center justify-center [perspective:1200px]">
        {PROJECTS.map((p, i) => {
          const t = getTransform(i);
          const isCenter = ((i - index + PROJECTS.length) % PROJECTS.length) === 0;
          return (
            <motion.div
              key={p.title}
//              className={`absolute w-[260px] md:w-[340px] rounded-xl overflow-hidden ${glassPanel} border border-cyan-400/30 shadow-lg cursor-grab active:cursor-grabbing`}


		className={`absolute w-[260px] md:w-[340px] rounded-xl overflow-hidden ${glassPanel} 
		  ${isCenter ? "border-2 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)]" : "border border-cyan-400/30"} 
		  cursor-grab active:cursor-grabbing`}


              animate={{
                x: t.x,
                scale: t.scale,
                rotateY: t.rotateY,
                opacity: t.opacity,
                zIndex: t.zIndex,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-40 md:h-48 object-cover border-b border-cyan-400/30"
                />
                {isCenter && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0"
                    initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                    animate={{
                      boxShadow: [
                        "0 0 24px rgba(34,211,238,0.4)",
                        "0 0 24px rgba(34,211,238,0.4)",
                        "0 0 0 rgba(0,0,0,0)",
                      ],
                    }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className={`text-base md:text-lg font-semibold ${neonText}`}>
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{p.description}</p>
                <div className="mt-4">
                  <a
		    target="_blank"
  		    rel="noopener noreferrer"			
                    href={p.url}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-md ${glassPanel} ${neonRing} text-cyan-300 hover:text-cyan-200`}
                  >
                    View Project
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

{/*
      <div className="flex gap-6 mt-6">
        <button
          onClick={prev}
          className={`px-3 py-2 rounded-md ${glassPanel} ${neonRing} text-slate-200 hover:text-cyan-300`}
        >
          ‹ Prev
        </button>
        <button
          onClick={next}
          className={`px-3 py-2 rounded-md ${glassPanel} ${neonRing} text-slate-200 hover:text-cyan-300`}
        >
          Next ›
        </button>
      </div>
*/}


	{/* Left button */}
	<button
	  onClick={prev}
	  className={`absolute left-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full ${glassPanel} ${neonRing} text-slate-200 hover:text-cyan-300 z-50`}
	>
	  &lt;
	</button>

	{/* Right button */}
	<button
	  onClick={next}
	  className={`absolute right-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full ${glassPanel} ${neonRing} text-slate-200 hover:text-cyan-300 z-50`}
	>
	  &gt;
	</button>


    {/* 👇 Add this block */}
    <div className="mt-8 text-center">
      <a
        href="https://github.com/BalaKrishnanCodeSpace"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block px-4 py-2 rounded-md ${glassPanel} ${neonRing} text-cyan-300 hover:text-cyan-200`}
      >
        View all projects on GitHub →
      </a>
    </div>
  </div>
);
};

/* ---------- Experience Hanging Cards ---------- */
const ExperienceHanging = () => (
  <div className="flex flex-col items-center gap-20">
    {EXPERIENCE.map((ex, i) => (
      <motion.div
        key={ex.title}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: i * 0.15 }}
        className="relative w-full max-w-md flex flex-col items-center"
      >
        {/* Dot in exact center */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
        </div>

        {/* Year text positioned to the right of the dot */}
        <div className="absolute -top-12 left-1/2 translate-x-6">
          <span className="text-xs text-slate-400">{ex.duration}</span>
        </div>

        {/* Connector line extending down from dot */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 40 }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-400 via-fuchsia-400 to-violet-400"
        />

        {/* Main card */}
        <div className={`mt-8 rounded-2xl p-6 ${glassPanel} ${neonRing} text-left`}>
          <h3 className={`text-lg font-semibold ${neonText}`}>{ex.title}</h3>
          {/* Company name only, no duration here */}
          <p className="text-sm text-slate-400 mb-2">{ex.company}</p>

          {Array.isArray(ex.summary) ? (
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
              {ex.summary.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-300">{ex.summary}</p>
          )}
        </div>
      </motion.div>
    ))}
  </div>
);
/* ---------- Education Timeline ---------- */
const EducationTimeline = () => (
  <div className="relative mx-auto max-w-4xl">
    {/* Central neon line */}
    <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-fuchsia-400 to-violet-400" />
    <div className="flex flex-col gap-16">
      {EDUCATION.map((ed, i) => (
        <motion.div
          key={ed.institution}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          className={`relative flex items-center ${i % 2 === 0 ? "justify-start" : "justify-end"} w-full`}
        >
          {/* Connector dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.9)] z-10" />
          {/* Card */}
          <div className={`w-[85%] md:w-[45%] rounded-2xl p-6 ${glassPanel} ${neonRing} border border-white/10`}>
            <h3 className={`text-lg font-semibold ${neonText}`}>{ed.institution}</h3>
            <p className="text-sm text-slate-400">
              {ed.degree} • {ed.duration}
            </p>
            <p className="mt-2 text-sm text-slate-300">{ed.details}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ---------- Contact Section (UPDATED) ---------- */
const Contact = () => {
  // IMPORTANT: The unique Formspree ID has been set here using the ID provided by the user.
  const FORM_ID = 'xwpwkgvb'; 
  const FORM_ENDPOINT = `https://formspree.io/f/${FORM_ID}`;

  const [form, setForm] = useState({ 
    name: "", 
    // Use the email name expected by Formspree
    email: "", 
    message: "" 
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', or null

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Formspree requires fields to be named 'name', 'email', 'message'
    const payload = {
        name: form.name,
        _replyto: form.email, // Formspree uses _replyto to set the reply email
        message: form.message,
        // Optional: Can add a subject line
        _subject: `New Portfolio Message from ${form.name}`, 
    };

    try {
        const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            setStatus('success');
            setForm({ name: "", email: "", message: "" });
        } else {
            // Log response details if the submission failed
            const errorData = await response.json();
            console.error('Formspree Error:', response.status, errorData);
            setStatus('error');
        }
    } catch (error) {
        console.error('Network Error:', error);
        setStatus('error');
    } finally {
        setLoading(false);
        // Clear status message after a few seconds
        setTimeout(() => setStatus(null), 5000);
    }
  };


  return (
    // Outer div for centering the single contact container
    <div className="flex justify-center">
      <form 
        onSubmit={onSubmit} 
        className={`rounded-2xl p-6 md:p-8 ${glassPanel} ${neonRing} w-full max-w-xl`}
      >
        <h3 className={`text-xl font-semibold text-center ${neonText}`}>Get in touch</h3>
        
        {/* Form Fields Container */}
        <div className="mt-6 grid grid-cols-1 gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Name</span>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={onChange}
              className="px-3 py-2 rounded-md bg-transparent border border-cyan-400/40 text-slate-200 focus:ring focus:ring-cyan-400/50 outline-none"
              placeholder="Your name"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Email</span>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange}
              className="px-3 py-2 rounded-md bg-transparent border border-cyan-400/40 text-slate-200 focus:ring focus:ring-cyan-400/50 outline-none"
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Message</span>
            <textarea
              name="message"
              required
              value={form.message}
              onChange={onChange}
              rows={4}
              className="px-3 py-2 rounded-md bg-transparent border border-cyan-400/40 text-slate-200 resize-none focus:ring focus:ring-cyan-400/50 outline-none"
              placeholder="Say hello..."
            />
          </label>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md ${glassPanel} ${neonRing} text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-cyan-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                </>
            ) : (
                <>
                    Submit <span aria-hidden="true">→</span>
                </>
            )}
          </motion.button>
          
          <AnimatePresence>
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="text-sm text-center text-green-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
              >
                Message sent successfully! Thanks for reaching out.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="text-sm text-center text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]"
              >
                Submission failed. Please check your network or try again later.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        
        {/* Integrated Socials (Find me online) */}
        <div className="mt-8 pt-6 border-t border-cyan-400/20 flex flex-col items-center gap-4">
          <p className="text-sm text-slate-300 font-medium">Find me online</p>
          <div className="flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${glassPanel} ${neonRing} ${neonHover}`}
                aria-label={s.label}
              >
                {s.icon({ className: "w-5 h-5 text-slate-200 transition-colors duration-300" })}
              </a>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;
