import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  color: number; // hue variation
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  hue: number;
  phase: number;
}

export function StarfieldAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const nebulaeRef = useRef<Nebula[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initStars();
      initNebulae();
    };

    const starCount = 600; // More dense

    const initStars = () => {
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * 1000,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          color: Math.random() * 60 - 30, // Hue variation around primary
        });
      }
      starsRef.current = stars;
    };

    const initNebulae = () => {
      const nebulae: Nebula[] = [];
      for (let i = 0; i < 5; i++) {
        nebulae.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 200 + 100,
          opacity: Math.random() * 0.08 + 0.02,
          hue: Math.random() * 40 - 20,
          phase: Math.random() * Math.PI * 2,
        });
      }
      nebulaeRef.current = nebulae;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left - width / 2) / width,
        y: (e.clientY - rect.top - height / 2) / height,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const speed = 0.8; // Faster movement
    const focalLength = 250;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();

      // Draw nebulae in background
      const nebulae = nebulaeRef.current;
      nebulae.forEach((nebula) => {
        const pulse = Math.sin(Date.now() * 0.0005 + nebula.phase) * 0.3 + 0.7;
        const gradient = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          nebula.radius
        );
        gradient.addColorStop(0, `hsl(${primaryColor} / ${nebula.opacity * pulse})`);
        gradient.addColorStop(0.5, `hsl(${primaryColor} / ${nebula.opacity * pulse * 0.3})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(
          nebula.x - nebula.radius,
          nebula.y - nebula.radius,
          nebula.radius * 2,
          nebula.radius * 2
        );
      });

      const stars = starsRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      stars.sort((a, b) => b.z - a.z);

      stars.forEach((star) => {
        star.z -= speed;

        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        const scale = focalLength / star.z;
        const parallaxX = mouseRef.current.x * (star.z / 80);
        const parallaxY = mouseRef.current.y * (star.z / 80);
        
        const x = (star.x + parallaxX) * scale + centerX;
        const y = (star.y + parallaxY) * scale + centerY;

        if (x >= -50 && x <= width + 50 && y >= -50 && y <= height + 50) {
          const depth = 1 - star.z / 1000;
          const size = star.size * scale * 0.6;
          const opacity = star.opacity * depth;

          // Core star
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.5, size), 0, Math.PI * 2);
          ctx.fillStyle = `hsl(0 0% 100% / ${Math.min(1, opacity * 1.5)})`;
          ctx.fill();

          // Strong glow effect
          const glowSize = size * 4;
          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
          glowGradient.addColorStop(0, `hsl(${primaryColor} / ${opacity * 0.8})`);
          glowGradient.addColorStop(0.3, `hsl(${primaryColor} / ${opacity * 0.4})`);
          glowGradient.addColorStop(0.6, `hsl(${primaryColor} / ${opacity * 0.1})`);
          glowGradient.addColorStop(1, `hsl(${primaryColor} / 0)`);
          
          ctx.beginPath();
          ctx.arc(x, y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();

          // Trailing line for fast stars
          if (depth > 0.5 && size > 0.8) {
            const trailLength = depth * 25;
            const trailGradient = ctx.createLinearGradient(
              x, y,
              x - (star.x * scale * 0.08), y - (star.y * scale * 0.08)
            );
            trailGradient.addColorStop(0, `hsl(${primaryColor} / ${opacity * 0.6})`);
            trailGradient.addColorStop(1, `hsl(${primaryColor} / 0)`);
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - (star.x * scale * 0.08), y - (star.y * scale * 0.08));
            ctx.strokeStyle = trailGradient;
            ctx.lineWidth = size * 0.8;
            ctx.lineCap = "round";
            ctx.stroke();
          }
        }
      });

      // Floating ambient particles
      for (let i = 0; i < 80; i++) {
        const time = Date.now() * 0.0001;
        const px = Math.sin(time + i * 0.7) * width * 0.45 + centerX;
        const py = Math.cos(time * 0.8 + i * 0.9) * height * 0.35 + centerY;
        const pOpacity = 0.15 + Math.sin(Date.now() * 0.002 + i) * 0.08;
        const pSize = 1 + Math.sin(Date.now() * 0.001 + i * 2) * 0.5;
        
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${primaryColor} / ${pOpacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 1 }}
    />
  );
}
