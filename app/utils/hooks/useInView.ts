import { useEffect, useRef, useState } from 'react';

export default function useInView() {
  const [inView, setInView] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    const currentTrigger = triggerRef.current;

    if (currentTrigger) {
      observer.observe(currentTrigger);
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, []);

  return [triggerRef, inView] as const;
}
