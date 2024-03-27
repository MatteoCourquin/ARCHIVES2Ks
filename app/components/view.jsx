import clsx from 'clsx';
import { useContext, useState } from 'react';
import { ColorsContext } from '../layout/default';
import Arrow from './icons';
import VariableFont from './variableFont';



const View = ({
  description,
  legend,
  title,
  images,
  active,
  sticker,
  elementsLength,
  refs,
  changeElement,
}) => {
  const { colors } = useContext(ColorsContext);
  const [hoveredIndex, setHoveredIndex] = useState(0)

  return (
    <div className='w-screen h-full grid grid-cols-layout pt-16'>
      <div
        className='border-r-2 p-6 z-10 transition-colors-all flex flex-col justify-between'
        style={{ borderColor: colors.primary }}
      >
        <p
          className='clash-display transition-colors-all'
          style={{ color: colors.primary }}
        >
          {description.split('').map((letter, index) => (
            <span
              key={index}
              className='inline-block -translate-y-8 opacity-0'
              ref={(el) => (refs.descriptionRef.current[index] = el)}
            >
              {letter == ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </p>
        <div>
          {sticker && (
            <div ref={refs.stickerRef} className='opacity-0 rotate-180'>
              <img
                className='skew-x-shakeng'
                src={'/images/stickers/' + sticker}
                alt=''
              />
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-col z-10'>
        
        <div className='flex overflow-hidden w-[calc(100vw-260px)] pt-6'>
          <p
            className='transition-colors-all whitespace-nowrap animation-slider'
            style={{ color: colors.primary }}
          >
            {Array(20)
              .fill()
              .map((_, index) => (
                <span key={index}>{title} • </span>
              ))}
          </p>
          <p
            className='transition-colors-all whitespace-nowrap animation-slider'
            style={{ color: colors.primary }}
          >
            {Array(20)
              .fill()
              .map((_, index) => (
                <span key={index}>{title} • </span>
              ))}
          </p>
        </div>
        <div className='flex flex-col justify-between h-full pt-10 p-6'>
          <div className='flex w-full gap-10 h-4/6 pr-4' onMouseLeave={() => setHoveredIndex(0)}>
            {images.map((src, index) => (
              <div
                key={index}
                className={clsx(
                  index == hoveredIndex ? ' flex-grow w-3/5' : 'flex-shrink w-1/5',
                  'h-full transition-all min-w-44 duration-300'
                )}
                onMouseOver={() => setHoveredIndex(index)}
              >
                <img
                  ref={(el) => (refs.imagesRef.current[index] = el)}
                  className={clsx(
                    'w-full h-full object-cover rounded-main image translate-x-96 opacity-0'
                  )}
                  style={{ boxShadow: `14px 14px 0px 0px ${colors.primary}` }}
                  src={src ? '/images/illustrations/'+src : ''}
                  alt=''
                />
              </div>
            ))}
          </div>
          <div className='flex justify-between items-end'>
            <div>
              <p
                className='clash-display text-4xl transition-colors-all'
                style={{ color: colors.primary }}
              >
                {legend.split('').map((letter, index) => (
                  <span
                    key={index}
                    ref={(el) => (refs.textRef.current[index] = el)}
                    className='inline-block -translate-y-8 opacity-0'
                  >
                    {letter == ' ' ? '\u00A0' : letter}
                  </span>
                ))}
              </p>

              <VariableFont color={colors.primary} title={title}/>

            </div>
            <Arrow
              onClick={() =>
                changeElement(active >= elementsLength - 1 ? 0 : active + 1)
              }
              color={colors.primary}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
