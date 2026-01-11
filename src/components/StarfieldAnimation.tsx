import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
}

export function StarfieldAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
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
    };

    const starCount = 300;

    const initStars = () => {
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * 1000,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
      starsRef.current = stars;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse move handler for subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left - width / 2) / width,
        y: (e.clientY - rect.top - height / 2) / height,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const speed = 0.3;
    const focalLength = 300;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      
      // Get primary color from CSS variable
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();

      gradient.addColorStop(0, `hsl(${primaryColor} / 0.03)`);
      gradient.addColorStop(0.5, `hsl(${primaryColor} / 0.01)`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const stars = starsRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      // Sort stars by z for proper depth rendering
      stars.sort((a, b) => b.z - a.z);

      stars.forEach((star) => {
        // Move star closer (z decreases)
        star.z -= speed;

        // Reset star if it passes the camera
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        // Project 3D to 2D with perspective
        const scale = focalLength / star.z;
        
        // Add subtle parallax based on mouse position
        const parallaxX = mouseRef.current.x * (star.z / 100);
        const parallaxY = mouseRef.current.y * (star.z / 100);
        
        const x = (star.x + parallaxX) * scale + centerX;
        const y = (star.y + parallaxY) * scale + centerY;

        // Only draw if on screen
        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          // Size and opacity based on distance
          const depth = 1 - star.z / 1000;
          const size = star.size * scale * 0.5;
          const opacity = star.opacity * depth;

          // Draw star with glow
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.5, size), 0, Math.PI * 2);
          
          // Create a subtle glow effect
          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
          glowGradient.addColorStop(0, `hsl(${primaryColor} / ${opacity})`);
          glowGradient.addColorStop(0.4, `hsl(${primaryColor} / ${opacity * 0.4})`);
          glowGradient.addColorStop(1, `hsl(${primaryColor} / 0)`);
          
          ctx.fillStyle = `hsl(0 0% 100% / ${opacity})`;
          ctx.fill();

          // Draw glow
          ctx.beginPath();
          ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();

          // Draw trailing line for fast-moving close stars
          if (depth > 0.7 && size > 1) {
            const trailLength = depth * 15;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - (star.x * scale * 0.05), y - (star.y * scale * 0.05));
            ctx.strokeStyle = `hsl(${primaryColor} / ${opacity * 0.3})`;
            ctx.lineWidth = size * 0.5;
            ctx.stroke();
          }
        }
      });

      // Add some static ambient particles
      for (let i = 0; i < 50; i++) {
        const px = Math.sin(Date.now() * 0.0001 + i * 0.5) * width * 0.4 + centerX;
        const py = Math.cos(Date.now() * 0.00008 + i * 0.7) * height * 0.3 + centerY;
        const pOpacity = 0.1 + Math.sin(Date.now() * 0.001 + i) * 0.05;
        
        ctx.beginPath();
        ctx.arc(px, py, 1, 0, Math.PI * 2);
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
      style={{ opacity: 0.9 }}
    />
  );
}
