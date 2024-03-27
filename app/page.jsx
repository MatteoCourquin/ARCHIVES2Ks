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
  const stickerRef = useRef();
  const refs = { textRef, imagesRef, descriptionRef, stickerRef };

  useEffect(() => {
    setColors({
      primary: elements[active]?.colors.primary,
      secondary: elements[active]?.colors.secondary,
    });
    startAnimation();
  }, [elements, active]);

  const startAnimation = () => {
    timeline.current
      .add(
        gsap.to(stickerRef.current, {
          rotate: '0deg',
          opacity: 1,
          duration: 1,
          ease: 'power4.in',
        })
      )
      .add(
        gsap.to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          ease: 'power4.inOut',
          duration: 0.5,
          stagger: 0.002,
        })
      )
      .add(
        gsap.to(imagesRef.current, {
          x: 0,
          opacity: 1,
          ease: 'power4.inOut',
          stagger: 0.05,
        }),
        '=-0.4'
      )
      .add(
        gsap.to(textRef.current, {
          y: 0,
          opacity: 1,
          ease: 'power4.inOut',
          stagger: 0.02,
        }),
        '=-0.6'
      )
      .play();
  };

  const fromAnimation = (onCompleteCallback) => {
    timeline.current
      .clear()
      .add(
        gsap.to(descriptionRef.current, {
          opacity: 0,
          y: 30,
          ease: 'power4.inOut',
          duration: 0.5,
          stagger: 0.002,
        })
      )
      .add(
        gsap.to(imagesRef.current, {
          x: 384,
          opacity: 0,
          ease: 'power4.inOut',
          stagger: 0.05,
        }),
        '=-0.4'
      )
      .add(
        gsap.to(textRef.current, {
          y: -30,
          opacity: 0,
          ease: 'power4.inOut',
          stagger: 0.02,
        }),
        '=-0.6'
      )
      .add(
        gsap.to(stickerRef.current, {
          rotate: '3280deg',
          duration: 1,
          opacity: 0,
          ease: 'power4.in',
        })
      )
      .add(() => {
        if (typeof onCompleteCallback === 'function') {
          onCompleteCallback();
        }
      })
      .add(
        gsap.to('.anim', {
          '--wght': 900,
          opacity: 0, 
          repeat: 0,
          duration: 0.5,
          stagger: {
            from: 'start',
            each: 0.1,
          },
          ease: 'back.inOut'
        })
      )
      .add(
        gsap.to('.textAnim', {
          opacity: 0,
          ease: 'power4.inOut',
        })
      )

      .play();
  };



  const changeElement = (index) => {
    fromAnimation(() => {
      setActive(index);
    });
  };

  if (!elements.length || !colors.primary) return;

  return (
    <div className='h-screen w-fit fixed'>
      <View
        {...elements[active]}
        active={active}
        setActive={setActive}
        elementsLength={elements.length}
        refs={refs}
        changeElement={changeElement}
      />
    </div>
  );
}
