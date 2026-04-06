import { motion } from "framer-motion";
import heroOrbImg from "@/assets/hero-orb.png";

export function HeroOrb() {
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-video flex items-center justify-center">
      <motion.div 
        className="absolute inset-0 bg-white/5 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 w-[80%] aspect-square max-w-[400px] rounded-full overflow-hidden border border-white/10"
      >
        <img src={heroOrbImg} alt="The Orb" className="w-full h-full object-cover mix-blend-screen" />
      </motion.div>
    </div>
  );
}
