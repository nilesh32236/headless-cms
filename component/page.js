// components/Page.js
import Layout from "./layout";
import { useRouter } from "next/router";
// import { getPageBySlugQuery } from "@/lib/queries";

export default function Page({ pageData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div></div>;
  }

  const { slug, title, content, enqueuedStylesheets: styles, enqueuedScripts: scripts } = pageData.page;

  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}
