'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export default function Home() {
  const element = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(element.current, { duration: 1, opacity: 0, y: 100 });
  });

  return (
    <main>
      <h1 ref={element}>INDEX</h1>
    </main>
  );
}
