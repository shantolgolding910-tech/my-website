import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItem {
  id: string
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => {
        const isOpen = openId === item.id
        
        // Cycle through brand colors for the icon badge
        const badgeColors = [
          "bg-brand-teal/10 text-brand-teal",
          "bg-brand-blue/10 text-brand-blue",
          "bg-brand-purple/10 text-brand-purple",
          "bg-brand-pink/10 text-brand-pink"
        ]
        const colorClass = badgeColors[index % badgeColors.length]

        return (
          <div 
            key={item.id}
            className={cn(
              "group rounded-2xl border transition-all duration-300 overflow-hidden",
              isOpen ? "bg-card border-white/10 shadow-lg" : "bg-card/50 border-white/5 hover:border-white/10 hover:bg-card"
            )}
          >
            <button
              className="w-full px-6 py-6 flex items-center justify-between text-left"
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", colorClass)}>
                  <span className="font-bold text-sm">{index + 1}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </div>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300",
                isOpen ? "bg-primary text-primary-foreground rotate-180" : "bg-white/5 text-muted-foreground group-hover:bg-white/10"
              )}>
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-0 ml-14 text-muted-foreground leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
