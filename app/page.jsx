'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContext, useEffect, useState } from 'react';
import { ColorsContext } from '../app/layout/default';
import View from './components/view';
import elementsJSON from './utils/elements.json';

export default function Home() {
  const [elements, setElements] = useState(elementsJSON);
  const { colors, setColors } = useContext(ColorsContext);
  const [active, setActive] = useState(0);

  // useGSAP(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   gsap.from('.container-scroll', {
  //     scrollTrigger: {
  //       trigger: '.content',
  //       start: 'top top',
  //       end: 'bottom top',
  //       // markers: true,
  //     },
  //     opacity: 0,
  //     ease: 'power1.inOut',
  //   });
  //   gsap.to('.image', {
  //     scrollTrigger: {
  //       trigger: '.content',
  //       start: 'top top',
  //       end: 'bottom top',
  //       markers: true,
  //       scrub: true,
  //       pin: true,
  //     },
  //     x: 1000,
  //     ease: 'none',
  //   });
  // });

  useEffect(() => {
    setColors({
      primary: elements[active]?.colors.primary,
      secondary: elements[active]?.colors.secondary,
    });
  }, [active, elements]);

  if (!elements.length || !colors.primary) return;

  return (
    <div className='h-screen w-fit fixed'>
      {/* {elements.map((element, index) => ( */}
      <View
        {...elements[active]}
        active={active}
        setActive={setActive}
        elementsLength={elements.length}
      />
      {/* ))} */}
    </div>
  );
}
