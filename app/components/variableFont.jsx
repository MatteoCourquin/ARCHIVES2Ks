import gsap from 'gsap';
import { useTouchDevice } from '../utils/states';
import { useEffect } from 'react';

const VariableFont = ({ color, title, titleRef }) => {
  const isTouchDevice = useTouchDevice();

  const updateTextMouse = (e) => {
    const textAnim = document.querySelector('.textAnim');
    if (!textAnim) return;

    const textRect = textAnim.getBoundingClientRect();

    const centerX = textRect.left + textRect.width / 2;
    const centerY = textRect.top + textRect.height / 2;

    const distanceX = Math.max(
      Math.abs(e.clientX - centerX) - textRect.width / 2,
      0
    );
    const distanceY = Math.max(
      Math.abs(e.clientY - centerY) - textRect.height / 2,
      0
    );

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const maxDistance = 400;
    const minWeight = 400;
    const maxWeight = 900;
    let weight;

    if (distance < maxDistance) {
      const distanceRatio = distance / maxDistance;
      weight = maxWeight - distanceRatio * (maxWeight - minWeight);
    } else {
      weight = minWeight;
    }

    gsap.to('.anim ', {
      '--wght': weight,
      duration: 0.2,
      stagger: {
        from: 'start',
        each: 0.02,
      },
      ease: 'none',
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined' || !isTouchDevice) {
      window.addEventListener('mousemove', updateTextMouse);
    }
  }, []);

  return (
    <h1
      className='clash-display w-full whitespace-nowrap text-[8vw] leading-none transition-colors-all textAnim'
      style={{ color: color }}
    >
      {title.split('').map((letter, index) => (
        <span
          key={index}
          className='inline-block opacity-0 -translate-y-8 anim font-thin anim'
          ref={(el) => (titleRef.current[index] = el)}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </h1>
  );
};

export default VariableFont;
