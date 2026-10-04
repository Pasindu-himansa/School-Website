import { useEffect, useRef, useState } from "react";

// Fades its children up into view the first time they scroll on screen.
// `delay` (ms) staggers items in a row. Styles live in index.css (.reveal).
const Reveal = ({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...props
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
