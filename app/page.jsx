'use client';

import gsap from 'gsap';
import { useContext, useEffect, useRef, useState } from 'react';
import { ColorsContext } from '../app/layout/default';
import View from './components/view';
import elementsJSON from './utils/elements.json';

export default function Home() {
  const [elements, setElements] = useState(elementsJSON);
  const { colors, setColors } = useContext(ColorsContext);
  const timeline = useRef(gsap.timeline({ paused: true }));
  const [active, setActive] = useState(0);
  const textRef = useRef([]);
  const imagesRef = useRef([]);
  const descriptionRef = useRef([]);

  useEffect(() => {
    setColors({
      primary: elements[active]?.colors.primary,
      secondary: elements[active]?.colors.secondary,
    });
  }, [elements, active]);

  const startAnimation = () => {
    timeline.current
      .add(
        gsap.to(imagesRef.current, {
          xPercent: 100,
          opacity: 0,
          ease: 'power4.inOut',
          stagger: 0.05,
        }),
        '=+0'
      )
      .add(
        gsap.to(textRef.current, {
          y: -30,
          opacity: 0,
          ease: 'power4.inOut',
          stagger: 0.02,
        }),
        '=-0.3'
      )
      .add(
        gsap.to(descriptionRef.current, {
          y: 30,
          rotate: 30,
          opacity: 0,
          ease: 'power4.inOut',
        })
      )
      .play();
  };

  const fromAnimation = () => {
    timeline.current.reverse();
  };

  const changeElement = (index) => {
    startAnimation();
    setTimeout(() => {
      setActive(index);
      fromAnimation();
    }, 3000);
  };

  if (!elements.length || !colors.primary) return;

  return (
    <div className='h-screen w-fit fixed'>
      <View
        {...elements[active]}
        active={active}
        setActive={setActive}
        elementsLength={elements.length}
        textRef={textRef}
        imagesRef={imagesRef}
        changeElement={changeElement}
        descriptionRef={descriptionRef}
      />
    </div>
  );
}
