import React from "react";

const Script = ({ src, children }) => {
    const loadScript = src => {
        return Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;

            document.body.appendChild(script);
        });
    }

    React.useEffect(() => {
        loadScript(src);
    }, [src]);

    return children ? <>{children}</> : null;
}

export default Script;