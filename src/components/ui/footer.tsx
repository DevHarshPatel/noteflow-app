import Link from "next/link";
import { cn } from "@/lib/utils";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#F9FAFB] text-[#4B5563] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Left section - Logo and tagline */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className={cn(
                "text-xl font-bold tracking-tight inline-block",
                "bg-gradient-to-r from-blue-500 to-blue-600",
                "bg-clip-text text-transparent",
                "drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
              )}
            >
              Noteflow
            </Link>
            <p className="text-sm">Built for thinkers.</p>
          </div>

          {/* Middle section - Links */}
          <div className="grid grid-cols-3 gap-8">
            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:text-blue-500 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-blue-500 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-blue-500 transition-colors">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:text-blue-500 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-blue-500 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-blue-500 transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:text-blue-500 transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-blue-500 transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-blue-500 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right section - Social media */}
          <div className="flex flex-col items-start lg:items-end space-y-4">
            <h3 className="font-semibold">Follow us</h3>
            <div className="flex space-x-4">
              <Link 
                href="#" 
                className="text-[#4B5563] hover:text-blue-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="text-[#4B5563] hover:text-blue-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="text-[#4B5563] hover:text-blue-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-center">
            © Noteflow 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 