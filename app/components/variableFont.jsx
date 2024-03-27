import Splitting from 'splitting';
import gsap from 'gsap';

const VariableFont = ({ color, title }) => {

  Splitting({
    target: ".textAnim",
  });
  
    gsap.to('.char', {
    '--wght': 900,
    color: color,
    duration: 1,
    repeat: 0,
    stagger: {
      from: 'start',
      each: 0.1,
    },
    ease: 'back.inOut'
  });


  function updateText(e) {
  const textAnim = document.querySelector('.textAnim');
  if (!textAnim) return;

  const textRect = textAnim.getBoundingClientRect();
  
  // Calculer les coordonnées du centre de l'élément de texte
  const centerX = textRect.left + textRect.width / 2;
  const centerY = textRect.top + textRect.height / 2;

  // Calculer les distances horizontale et verticale de la souris au centre de l'élément
  const distanceX = Math.max(Math.abs(e.clientX - centerX) - textRect.width / 2, 0);
  const distanceY = Math.max(Math.abs(e.clientY - centerY) - textRect.height / 2, 0);

  // Calculer la distance euclidienne depuis le bord le plus proche de l'élément
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // Déterminer le poids de la police basé sur la distance
  const maxDistance = 400; // Distance maximale pour influencer le poids
  const minWeight = 400;
  const maxWeight = 900;
  let weight;

  // Ajuster le poids de la police en fonction de la distance à l'élément
  if (distance < maxDistance) {
    const distanceRatio = distance / maxDistance;
    weight = maxWeight - (distanceRatio * (maxWeight - minWeight));
  } else {
    weight = minWeight;
  }

  gsap.to('.char', {
    '--wght': weight,
    duration: 0.5,
    stagger: {
      from: 'start',
      each: 0.1,
    },
    ease: 'sine.out'
  });
};

window.addEventListener("mousemove", updateText);


  return (
    <div>
        <h1 className='clash-display w-full whitespace-nowrap font-black text-[8vw] leading-none transition-colors-all textAnim'
          style={{ color: color }}>
          {title}
        </h1>
    </div>
  );
};

export default VariableFont;
