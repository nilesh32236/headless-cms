import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { WORDPRESS_SITE_URL_QUERY, allowedHandlers } from "@/lib/queries";
import Script from "next/script";
import DynamicStyleTag from "./style";

const Body = ({ className }) => {
  useEffect(() => {
    // Split the class string into individual class names
    const classNames = className.split(' ');

    // Add each class name to the body element's classList
    classNames.forEach(name => {
      document.body.classList.add(name);
    });

    // Cleanup function to remove added classes when component unmounts
    return () => {
      classNames.forEach(name => {
        document.body.classList.remove(name);
      });
    };
  }, [className]); // Run effect whenever className prop changes

  return null; // This component doesn't render anything visible
};

const Layout = ({ children, pageSlug }) => {
  const [styles, setStyles] = useState([]);
  const [scripts, setScripts] = useState([]);
  const { loading, error, data } = useQuery(WORDPRESS_SITE_URL_QUERY);

  useEffect(() => {
    if (!loading && !error && data) {
      const wordpressUrl = data.generalSettings.url;
      const filteredStyles = data.registeredStylesheets.nodes.filter(style => allowedHandlers.includes(style.handle));

      const processedStyles = filteredStyles.reduce((uniqueStyles, style) => {
        if (!uniqueStyles.find(uniqueStyle => uniqueStyle.id === style.id)) {
          return [
            ...uniqueStyles,
            {
              ...style,
              src: style.src.startsWith('http') ? style.src : `${wordpressUrl}${style.src}`
            }
          ];
        }
        return uniqueStyles;
      }, []);

      setStyles(processedStyles);

      const filterScript = data.registeredScripts.nodes.filter(script => allowedHandlers.includes(script.handle));
      const processedScripts = filterScript.map((script) => {
        return {
          ...script,
          src: script.src.startsWith('http') ? script.src : `${wordpressUrl}${script.src}`
        };
      });

      setScripts(processedScripts);
    }
  }, [loading, error, data]);

  if (loading || error || !data) {
    // Return null or a loading indicator if data is not yet available
    return null;
  }

  return (
    <>
      <DynamicStyleTag styles={styles} />
      {/* {styles?.map(style => (
        <React.Fragment key={style.id}>
          {style.src && (
            <Head>
              <link rel="stylesheet" href={style.src} />
              {style.after && (
                <style>{style.after}</style>
              )}
            </Head>
          )}
        </React.Fragment>
      ))} */}

      {scripts?.map(script => (
        <React.Fragment key={script.id}>
          {script.extraData && (
            <Script>{script.extraData}</Script>
          )}
          <Script key={script.id} src={script.src}></Script>
        </React.Fragment>
      ))}
      <Body className="home blog ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.6.5 ast-inherit-site-logo-transparent ast-hfb-header"></Body>
      <div className="hfeed site" id="page">
        <Header pageSlug={pageSlug} />
        <div id="content" className="site-content">
          <div className="ast-container">
            <div id="primary" className="content-area primary">
              <main id="main" className="site-main">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
