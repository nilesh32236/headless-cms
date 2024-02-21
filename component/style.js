import React, { useEffect, useRef } from 'react';

const DynamicStyleTag = ({ styles }) => {
  const prevStylesRef = useRef([]);

  useEffect(() => {
    // Compare current styles with previous styles
    const stylesChanged = JSON.stringify(styles) !== JSON.stringify(prevStylesRef.current);

    // If styles have changed, add or remove styles
    if (stylesChanged) {
      console.log(styles);
      // Remove previous styles
      prevStylesRef.current.forEach(style => {
        if (style.src) {
          const linkElement = document.querySelector(`link[href="${style.src}"]`);
          linkElement && document.head.removeChild(linkElement);
        }
        if (style.after) {
          const styleElement = document.querySelector(`style[data-id="${style.id}"]`);
          styleElement && document.head.removeChild(styleElement);
        }
      });

      // Add new styles
      styles.forEach(style => {
        if (style.src) {
          const linkElement = document.createElement('link');
          linkElement.rel = 'stylesheet';
          linkElement.href = style.src;
          document.head.appendChild(linkElement);
        }
        if (style.after) {
          console.log(style.after);
          const styleElement = document.createElement('style');
          styleElement.innerHTML = style.after;
          styleElement.dataset.id = style.id; // Set a unique identifier
          document.head.appendChild(styleElement);
        }
      });

      // Update previous styles
      prevStylesRef.current = styles;
    }
  }, [styles]);

  return null;
};

export default DynamicStyleTag;
