import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <a href="#home" className="font-mono text-lg font-bold">
            <span className="text-gradient-cyber">kiizi</span>
            <span className="text-muted-foreground">.dev</span>
          </a>
          <p className="text-sm text-muted-foreground mt-1">Building the future, one line at a time.</p>
        </div>

        <div className="flex items-center gap-4">
          {[Github, Twitter, Linkedin, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="text-center mt-8 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground font-mono">
          © {new Date().getFullYear()} Kiizi Portfolio Platform. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
