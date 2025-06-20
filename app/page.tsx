"use client";


import { FeatureGrid } from "@/components/Grid";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";


export default function page() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <FeatureGrid/>
    </>
  );
}

