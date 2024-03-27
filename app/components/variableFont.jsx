import gsap from 'gsap';

const VariableFont = ({ color, title, titleRef }) => {
  // gsap.to('.firstAnim', {
  //   opacity: 1,
  //   duration: 0.5,
  //   stagger: {
  //     from: 'start',
  //     each: 0.1,
  //   },
  //   ease: 'back.inOut',
  // });

  function updateTextMouse(e) {
    const textAnim = document.querySelector('.textAnim');
    if (!textAnim) return;

    const textRect = textAnim.getBoundingClientRect();

    const distanceX = Math.max(
      Math.abs(e.clientX - textRect.left + textRect.width / 2) -
        textRect.width / 2
    );
    const distanceY = Math.max(
      Math.abs(e.clientY - textRect.top + textRect.height / 2) -
        textRect.height / 2
    );

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const maxDistance = 400;
    const minWeight = 100;
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
        each: 0.01,
      },
      ease: 'none',
    });
  }

  window.addEventListener('mousemove', updateTextMouse);

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
