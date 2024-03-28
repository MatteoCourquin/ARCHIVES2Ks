'use client';

import gsap from 'gsap';
import { useContext, useEffect, useRef, useState } from 'react';
import { ColorsContext } from '../app/layout/default';
import View from './components/view';
import elementsJSON from './data/elements.json';
import Background from './components/background';
import { useTouchDevice } from './utils/states';

export default function Home() {
  const [elements] = useState(elementsJSON);
  const { colors, setColors } = useContext(ColorsContext);
  const timeline = useRef(gsap.timeline({ paused: true }));
  const [active, setActive] = useState(0);
  const textRef = useRef([]);
  const imagesRef = useRef([]);
  const descriptionRef = useRef([]);
  const titleRef = useRef([]);
  const stickerRef = useRef();
  const backgroundRef = useRef();
  const isTouchDevice = useTouchDevice();
  const refs = { textRef, imagesRef, descriptionRef, stickerRef, titleRef };

  useEffect(() => {
    setColors({
      primary: elements[active]?.colors.primary,
      secondary: elements[active]?.colors.secondary,
    });
    showAnimation();
  }, [elements, active]);

  const showAnimation = () => {
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
        gsap.to(imagesRef.current, {
          x: 0,
          opacity: 1,
          ease: 'power4.inOut',
          stagger: 0.1,
        }),
        '=-0.8'
      )
      .add(
        gsap.to(textRef.current, {
          y: 0,
          opacity: 1,
          ease: 'power4.inOut',
          stagger: 0.02,
        }),
        '=-0.3'
      )
      .add(
        gsap.to(titleRef.current, {
          y: 0,
          opacity: 1,
          fontWeight: 900,
          ease: 'power4.inOut',
          stagger: 0.03,
        }),
        '=-0.3'
      )
      .add(
        gsap.to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          ease: 'power4.inOut',
          duration: 0.5,
          stagger: 0.002,
        }),
        '=-0.3'
      )
      .play();
  };

  const hideAnimation = (onCompleteCallback) => {
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
          stagger: 0.1,
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
        gsap.to(titleRef.current, {
          y: -30,
          opacity: 0,
          fontWeight: 100,
          ease: 'power4.inOut',
          stagger: 0.03,
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
      // .add(
      //   gsap.to('.anim', {
      //     '--wght': 900,
      //     opacity: 0,
      //     duration: 0.5,
      //     stagger: {
      //       from: 'start',
      //       each: 0.1,
      //     },
      //     ease: 'back.inOut',
      //   })
      // )
      // .add(
      //   gsap.to('.textAnim', {
      //     opacity: 0,
      //     ease: 'power4.inOut',
      //   })
      // )
      // .add(
      //   gsap.to('.anim', {
      //     '--wght': 900,
      //     opacity: 0,
      //     repeat: 0,
      //     // duration: 0.5,
      //     stagger: {
      //       from: 'start',
      //       each: 0.1,
      //     },
      //     ease: 'back.inOut',
      //   })
      // )
      // .add(
      //   gsap.to('.textAnim', {
      //     opacity: 0,
      //     ease: 'power4.inOut',
      //   })
      // )

      .play();
  };

  const changeElement = (index) => {
    hideAnimation(() => {
      setActive(index);
    });
  };

  const handleMouseMove = (e) => {
    if (backgroundRef === undefined || isTouchDevice) return;
    const x = e.clientX - window.innerWidth / 2;
    const y = e.clientY - window.innerHeight / 2;
    backgroundRef.current.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
  };

  useEffect(() => {
    if (typeof window !== 'undefined' || !isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove);
      let index;
      document.onkeydown = (e) => {
        switch (e.code) {
          case 'ArrowRight':
            console.log(e.code);
            console.log(active);
            index = active >= elements.length - 1 ? 0 : active + 1;
            console.log(index);
            changeElement(index);
            break;
          case 'ArrowLeft':
            console.log(e.code);
            console.log(active);
            index = active <= 0 ? elements.length - 1 : active - 1;
            console.log(index);
            changeElement(index);
            break;
          default:
            break;
        }
      };
    }
  }, [active]);

  if (!elements.length || !colors.primary) return;

  return (
    <div className='h-screen w-fit fixed transition-all'>
      <Background refBackground={backgroundRef} color={colors.secondary} />
      <div
        className='fixed top-0 left-0 w-screen h-screen opacity-40 -z-10'
        style={{
          backgroundSize: '60px 60px',
          backgroundPosition: 'center',
          backgroundImage: `linear-gradient(to right, ${colors.primary} 1px, transparent 1px), linear-gradient(to bottom, ${colors.primary} 1px, transparent 1px)`,
        }}
      ></div>
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
