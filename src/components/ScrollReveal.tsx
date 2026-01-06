import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    distance?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

export default function ScrollReveal({
    children,
    delay = 0,
    direction = "up",
    distance = 30,
    duration = 0.8,
    className = "",
    once = true,
}: ScrollRevealProps) {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directions[direction],
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
            }}
            viewport={{ once }}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smoother feel
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
