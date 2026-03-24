import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Play } from "lucide-react";

const categories = ["All", "Web Dev", "Video", "Photography", "IT"];

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Dev",
    description: "Full-stack e-commerce with payment integration, admin dashboard, and real-time inventory.",
    tech: ["React", "Node.js", "MySQL", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    type: "web",
  },
  {
    id: 2,
    title: "Brand Promo Video",
    category: "Video",
    description: "High-quality promotional video with motion graphics and professional color grading.",
    tech: ["Premiere Pro", "After Effects", "DaVinci"],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
    type: "video",
  },
  {
    id: 3,
    title: "Product Photography",
    category: "Photography",
    description: "Studio product shots with professional lighting and post-processing for an online store.",
    tech: ["Lightroom", "Photoshop", "Canon R6"],
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=400&fit=crop",
    type: "photo",
  },
  {
    id: 4,
    title: "SaaS Dashboard",
    category: "Web Dev",
    description: "Analytics dashboard with real-time data visualization, user management, and API integration.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Chart.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    type: "web",
  },
  {
    id: 5,
    title: "Network Infrastructure",
    category: "IT",
    description: "Complete network setup and cloud migration for a medium-sized enterprise.",
    tech: ["AWS", "Docker", "Linux", "Terraform"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    type: "it",
  },
  {
    id: 6,
    title: "Event Highlights Reel",
    category: "Video",
    description: "Dynamic event recap video with drone footage, interviews, and cinematic transitions.",
    tech: ["Premiere Pro", "After Effects", "DJI"],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop",
    type: "video",
  },
];

const PortfolioSection = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-10" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-mono text-sm mb-2">// portfolio</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured <span className="text-gradient-cyber">Projects</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(190_100%_50%/0.3)]"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.type === "video" ? (
                      <button className="p-2 rounded-full bg-primary/90 text-primary-foreground">
                        <Play size={16} />
                      </button>
                    ) : (
                      <>
                        <button className="p-2 rounded-full bg-card/90 text-foreground border border-border hover:border-primary transition-colors">
                          <Github size={16} />
                        </button>
                        <button className="p-2 rounded-full bg-primary/90 text-primary-foreground">
                          <ExternalLink size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <span className="text-xs font-mono text-primary">{project.category}</span>
                  <h3 className="text-foreground font-semibold mt-1 mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
