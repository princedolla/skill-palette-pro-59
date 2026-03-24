import { motion } from "framer-motion";
import { Code2, Monitor, Camera, Film, Server, Cpu } from "lucide-react";

const skills = [
  { name: "React / Next.js", level: 92 },
  { name: "Node.js / Express", level: 88 },
  { name: "TypeScript", level: 90 },
  { name: "Python", level: 78 },
  { name: "MySQL / PostgreSQL", level: 85 },
  { name: "Adobe Suite", level: 82 },
];

const stats = [
  { icon: Code2, label: "Projects", value: "50+" },
  { icon: Monitor, label: "Clients", value: "30+" },
  { icon: Cpu, label: "Technologies", value: "20+" },
  { icon: Server, label: "Years Exp.", value: "5+" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm mb-2">// about me</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            Who is <span className="text-gradient-cyber">Kiizi</span>?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer and IT specialist with a knack for
              creating elegant digital solutions. From building scalable web applications
              to producing stunning visual content, I bring technical expertise and creative
              vision to every project.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My toolkit spans modern web technologies, cloud infrastructure, video production,
              and photography — allowing me to deliver comprehensive digital experiences
              that go beyond just code.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-4 rounded-lg bg-card border border-border text-center group hover:border-primary/50 transition-colors"
                >
                  <stat.icon size={20} className="mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-mono">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            <h3 className="font-mono text-sm text-primary mb-6">{"<"} Technical Skills {"/>"}</h3>
            {skills.map((skill, i) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground font-medium">{skill.name}</span>
                  <span className="text-primary font-mono">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, hsl(190 100% 50%), hsl(263 70% 50%))",
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
