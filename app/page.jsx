'use client';

import { useContext, useEffect, useState } from 'react';
import { ColorsContext } from '../app/layout/default';
import View from './components/view';
import elementsJSON from './utils/elements.json';

export default function Home() {
  const [elements, setElements] = useState(elementsJSON);
  const { colors, setColors } = useContext(ColorsContext);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setColors({
      primary: elements[active]?.colors.primary,
      secondary: elements[active]?.colors.secondary,
    });
  }, [active, elements]);

  if (!elements.length || !colors.primary) return;

  return (
    <div className='h-[calc(100vh-64px)] overflow-y-scroll w-fit'>
      {elements.map((element, index) => (
        <View key={index} {...element} />
      ))}
    </div>
  );
}
