import { motion } from "framer-motion";
import { Code2, Film, Camera, Server, Smartphone, Database } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Full-stack web applications built with React, Node.js, and modern frameworks. Responsive, fast, and scalable.",
  },
  {
    icon: Smartphone,
    title: "UI/UX Design",
    description: "User-centered interfaces with intuitive navigation, clean layouts, and engaging visual design.",
  },
  {
    icon: Server,
    title: "IT Solutions",
    description: "Infrastructure setup, cloud deployment, system administration, and technical consulting.",
  },
  {
    icon: Film,
    title: "Video Editing",
    description: "Professional video production, motion graphics, color grading, and post-production work.",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Product photography, event coverage, portrait sessions, and professional photo editing.",
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Scalable database architecture, optimization, migration, and data management solutions.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm mb-2">// what i do</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            My <span className="text-gradient-cyber">Services</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <service.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
