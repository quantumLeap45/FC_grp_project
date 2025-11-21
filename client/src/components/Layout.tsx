import { Link, useLocation } from "wouter";
import { TreePine } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/finder", label: "Finder" },
    { path: "/directions", label: "Directions" },
    { path: "/scenic", label: "Scenic" },
    { path: "/safety", label: "Safety" },
    { path: "/credits", label: "Credits" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="skip-to-content"
        data-testid="link-skip-to-content"
      >
        Skip to main content
      </a>

      <header className="bg-primary text-primary-foreground border-b border-primary-border sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 lg:py-0">
            <Link 
              href="/" 
              className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2" 
              data-testid="link-home-logo"
            >
              <TreePine className="w-6 h-6" />
              <span className="font-bold text-lg hidden sm:inline">Green Gems</span>
            </Link>

            <nav className="flex-1 flex justify-end" role="navigation" aria-label="Main navigation">
              <ul className="flex flex-wrap items-center gap-1 lg:gap-0">
                {navItems.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <li key={item.path}>
                      <Link 
                        href={item.path}
                        className={`block px-3 lg:px-6 py-3 lg:py-5 text-sm lg:text-base font-medium transition-all hover-elevate ${
                          isActive ? "bg-primary-foreground/10" : ""
                        }`}
                        data-testid={`link-nav-${item.label.toLowerCase()}`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <footer className="bg-muted border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-2">
            Made by Team Green Gems
          </p>
          <Link 
            href="/credits"
            className="text-primary hover:underline font-medium" 
            data-testid="link-contact"
          >
            Contact us
          </Link>
        </div>
      </footer>
    </div>
  );
}
