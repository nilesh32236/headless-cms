import React, { useEffect } from 'react';

const DynamicStyleTag = ({ styles }) => {
    useEffect(() => {
        // Iterate over styles array and add each style to the document head
        styles.forEach(style => {
            // For external stylesheets
            if (style.src) {
                const linkElement = document.createElement('link');
                linkElement.rel = 'stylesheet';
                linkElement.href = style.src;
                document.head.appendChild(linkElement);
            }

            // For internal styles
            if (style.after) {
                const styleElement = document.createElement('style');
                styleElement.innerHTML = style.after;
                document.head.appendChild(styleElement);
            }
        });

        // Cleanup function to remove added elements when component unmounts
        return () => {
            styles.forEach(style => {
                if (style.src) {
                    const linkElement = document.querySelector(`link[href="${style.src}"]`);
                    linkElement && document.head.removeChild(linkElement);
                }
                if (style.after) {
                    const styleElement = document.querySelector(`style[data-id="${style.id}"]`);
                    styleElement && document.head.removeChild(styleElement);
                }
            });
        };
    }, [styles]); // Re-run the effect if styles array changes

    return null;
};

export default DynamicStyleTag;
