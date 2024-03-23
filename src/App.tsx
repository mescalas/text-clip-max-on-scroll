import './App.module.css';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './App.module.css';

function App() {
  const container = useRef<HTMLDivElement>(null);
  const stickyMask = useRef<HTMLDivElement>(null);

  const initialMaskSize = 10;
  const targetMaskSize = 10;
  const easing = 0.15;
  let easedScrollProgress = 0;

  useEffect(() => {
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    const maskSizeProgress = targetMaskSize * getScrollProgress();
    if (stickyMask.current) {
      stickyMask.current.style.webkitMaskSize = `${initialMaskSize + maskSizeProgress * 100}%`;
    }
    requestAnimationFrame(animate);
  };

  const getScrollProgress = () => {
    if (stickyMask.current && container.current) {
      const scrollProgress =
        stickyMask.current.offsetTop / (container.current.getBoundingClientRect().height - window.innerHeight);
      const delta = scrollProgress - easedScrollProgress;
      easedScrollProgress += delta * easing;
      return scrollProgress;
    }
    return 0;
  };

  return (
    <main>
      <div ref={container} className={styles.container}>
        <div ref={stickyMask} className={styles.stickyMask}>
          <video autoPlay muted loop>
            <source src="/medias/background.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className={styles.content}>
        <motion.h1 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          Mickael Jordan.
        </motion.h1>
      </div>
    </main>
  );
}

export default App;
