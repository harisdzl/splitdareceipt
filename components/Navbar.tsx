"use client";
import React, { useState } from "react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="bg-gray-700 p-4 flex justify-start items-center gap-4">
      <div className="text-white text-xl font-bold">
        <Link href="/">Split Da Receipt</Link>
      </div>
      <div className="rounded-xl bg-gray-400 px-4 p-y-2 text-lg text-white">
        <Link href="/explain">how to?</Link>
      </div>
    </div>
  );
};
