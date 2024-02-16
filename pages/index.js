import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/component/layout";
import client from "@/lib/apollo-client";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_POSTS
  })
}