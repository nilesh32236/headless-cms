import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { WORDPRESS_SITE_URL_QUERY, allowedHandlers } from "@/lib/queries";
import Script from "next/script";

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
      {styles?.map(style => (
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
      ))}

      {scripts?.map(script => (
        <React.Fragment key={script.id}>
          {script.extraData && (
            <Script>{script.extraData}</Script>
          )}
          <Script key={script.id} src={script.src}></Script>
        </React.Fragment>
      ))}
      <div className="hfeed site" id="page">
        <Header pageSlug={pageSlug}/>
        <div id="content" className="site-content">
          <div className="ast-container">
            <div id="primary" className="content-area primary">
              <main id="main" className="site-main">
                <article className="status-publish ast-article-single">
                  {children}
                </article>
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