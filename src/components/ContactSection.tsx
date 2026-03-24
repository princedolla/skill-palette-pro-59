import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm mb-2">// contact</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Let's <span className="text-gradient-cyber">Connect</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-muted-foreground leading-relaxed">
              Have a project in mind or want to collaborate? I'm always excited to
              discuss new opportunities and creative ideas. Let's build something amazing together.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "hello@kiizi.dev" },
                { icon: MapPin, label: "Location", value: "Available Worldwide" },
                { icon: Phone, label: "Phone", value: "Available on request" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">{item.label}</p>
                    <p className="text-foreground font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_hsl(190_100%_50%/0.4)] transition-all duration-300 disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Message"}
              <Send size={16} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
