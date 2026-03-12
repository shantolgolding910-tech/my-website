import { motion } from "framer-motion"

export function Hero3D() {
  return (
    <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}>
      <div className="relative w-[500px] h-[500px]">
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0.05) 50%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rotating outer ring */}
        <motion.div
          className="absolute inset-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-30">
            <circle cx="200" cy="200" r="185" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="8 16" />
          </svg>
        </motion.div>

        {/* Counter-rotating middle ring */}
        <motion.div
          className="absolute inset-16"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 300 300" className="w-full h-full opacity-20">
            <circle cx="150" cy="150" r="140" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4 12" />
          </svg>
        </motion.div>

        {/* Central 3D-ish hexagon / icosahedron face using CSS perspective */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "800px" }}>
          <motion.div
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              rotateX: [15, -15, 15],
              rotateY: [0, 360],
            }}
            transition={{
              rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 12, repeat: Infinity, ease: "linear" },
            }}
            className="relative w-48 h-48"
          >
            {/* Front face */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(37,99,235,0.6) 0%, rgba(96,165,250,0.3) 100%)",
                border: "1px solid rgba(96,165,250,0.5)",
                boxShadow: "0 0 40px rgba(37,99,235,0.4), inset 0 0 30px rgba(96,165,250,0.1)",
                backdropFilter: "blur(10px)",
                transform: "translateZ(40px)",
              }}
            />
            {/* Back face */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(17,24,61,0.9) 0%, rgba(37,99,235,0.4) 100%)",
                border: "1px solid rgba(37,99,235,0.3)",
                transform: "translateZ(-40px) rotateY(180deg)",
              }}
            />
            {/* Right face */}
            <div
              className="absolute inset-y-0"
              style={{
                width: "80px",
                right: "-40px",
                background: "linear-gradient(180deg, rgba(37,99,235,0.4) 0%, rgba(17,24,61,0.8) 100%)",
                border: "1px solid rgba(96,165,250,0.2)",
                transform: "rotateY(90deg)",
                transformOrigin: "left center",
              }}
            />
            {/* Left face */}
            <div
              className="absolute inset-y-0"
              style={{
                width: "80px",
                left: "-40px",
                background: "linear-gradient(180deg, rgba(96,165,250,0.3) 0%, rgba(17,24,61,0.8) 100%)",
                border: "1px solid rgba(96,165,250,0.2)",
                transform: "rotateY(-90deg)",
                transformOrigin: "right center",
              }}
            />
            {/* Top face */}
            <div
              className="absolute inset-x-0"
              style={{
                height: "80px",
                top: "-40px",
                background: "linear-gradient(90deg, rgba(96,165,250,0.5) 0%, rgba(37,99,235,0.3) 100%)",
                border: "1px solid rgba(96,165,250,0.3)",
                transform: "rotateX(90deg)",
                transformOrigin: "center bottom",
              }}
            />
            {/* Bottom face */}
            <div
              className="absolute inset-x-0"
              style={{
                height: "80px",
                bottom: "-40px",
                background: "linear-gradient(90deg, rgba(17,24,61,0.9) 0%, rgba(37,99,235,0.2) 100%)",
                border: "1px solid rgba(37,99,235,0.2)",
                transform: "rotateX(-90deg)",
                transformOrigin: "center top",
              }}
            />
          </motion.div>
        </div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              backgroundColor: i % 3 === 0 ? "#60a5fa" : i % 3 === 1 ? "#2563eb" : "#818cf8",
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              opacity: 0.6,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Blueprint-style grid lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 500 500"
        >
          {[100, 150, 200, 250, 300, 350, 400].map((x) => (
            <line key={`v-${x}`} x1={x} y1="50" x2={x} y2="450" stroke="#2563eb" strokeWidth="0.5" />
          ))}
          {[100, 150, 200, 250, 300, 350, 400].map((y) => (
            <line key={`h-${y}`} x1="50" y1={y} x2="450" y2={y} stroke="#2563eb" strokeWidth="0.5" />
          ))}
          <circle cx="250" cy="250" r="120" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="80" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="40" fill="none" stroke="#60a5fa" strokeWidth="1" />
        </svg>
      </div>
    </div>
  )
}
