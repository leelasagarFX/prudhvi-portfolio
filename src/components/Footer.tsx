import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-foreground/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <a href="#" className="text-2xl font-bold tracking-tighter text-foreground mb-2 block">
            Port<span className="text-primary">folio</span>
          </a>
          <p className="text-foreground/60 text-sm">
            © {new Date().getFullYear()} Prudhvi Raju. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://x.com/ig_prudhv1" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
            <Twitter size={20} />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="https://www.linkedin.com/in/prudhvirajum/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
            <Linkedin size={20} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:mudunuriprudhvi19@gmail.com" className="text-foreground/60 hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
            <Mail size={20} />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
