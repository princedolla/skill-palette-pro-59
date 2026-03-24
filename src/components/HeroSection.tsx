import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Terminal } from "lucide-react";

const roles = [
  "Full Stack Developer",
  "IT Specialist",
  "Video Editor",
  "Photographer",
  "Software Engineer",
];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === role) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting ? role.slice(0, displayText.length - 1) : role.slice(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-[120px] animate-glow-pulse" style={{ animationDelay: "1s" }} />

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-px bg-primary/20 animate-scan-line" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Terminal badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8"
          >
            <Terminal size={14} className="text-primary" />
            <span className="text-xs font-mono text-muted-foreground">
              ~/kiizi <span className="text-primary">$</span> ready_to_build
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6">
            <span className="block text-foreground">Creative</span>
            <span className="block text-gradient-cyber">Developer</span>
          </h1>

          <div className="h-10 flex items-center justify-center mb-8">
            <span className="font-mono text-lg md:text-xl text-muted-foreground">
              {">"} {displayText}
              <span className="animate-typing-cursor text-primary">|</span>
            </span>
          </div>

          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
            Building cutting-edge digital experiences from concept to deployment.
            Specializing in full-stack development, creative media production,
            and innovative technology solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#portfolio"
              className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_hsl(190_100%_50%/0.4)] transition-all duration-300"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-md border border-border text-foreground font-semibold hover:border-primary hover:text-primary transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-xs font-mono">scroll</span>
            <ChevronDown size={16} className="animate-float" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
