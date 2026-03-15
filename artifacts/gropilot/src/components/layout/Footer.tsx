import { Linkedin, Twitter, Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <a href="#" className="flex items-center gap-3 group inline-flex">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <div className="w-3 h-3 bg-background rounded-sm" />
              </div>
              <span className="font-display font-bold text-xl tracking-wide text-white">
                GroPilot
              </span>
            </a>
            <p className="text-muted-foreground max-w-xs">
              Systems-driven growth for business owners. We build predictable paths from visibility to revenue.
            </p>
            <div className="flex items-center gap-4">
              
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Process', 'Solutions'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">Resources</h4>
            <ul className="space-y-4">
              {['FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 GroPilot · All rights reserved
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Built with <span className="text-primary">precision</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
