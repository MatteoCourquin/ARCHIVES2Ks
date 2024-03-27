import clsx from 'clsx';
import { useContext } from 'react';
import { ColorsContext } from '../layout/default';
import Arrow from './icons';

const View = ({
  description,
  legend,
  title,
  images,
  active,
  sticker,
  elementsLength,
  textRef,
  imagesRef,
  changeElement,
  descriptionRef,
}) => {
  const { colors } = useContext(ColorsContext);

  const letters = description.split('');

  // Utilisez map pour créer des éléments <span> autour de chaque lettre
  const processedDescription = description
    .replace(/<b>/g, '<strong>')
    .replace(/<\/b>/g, '</strong>');

  return (
    <div className='w-screen h-full grid grid-cols-layout pt-16'>
      <div
        className='border-r-2 p-6 z-10 transition-colors-all flex flex-col justify-between'
        style={{ borderColor: colors.primary }}
      >
        <p
          ref={descriptionRef}
          className='clash-display transition-colors-all'
          style={{ color: colors.primary }}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <div>
          {sticker && (
            <img
              className='skew-x-shakeng'
              src={'/images/stickers/' + sticker}
              alt=''
            />
          )}
        </div>
      </div>
      <div className='flex flex-col z-10'>
        <div className='flex overflow-hidden w-[calc(100vw-260px)] pt-6'>
          <p
            className='transition-colors-all whitespace-nowrap animation-slider'
            style={{ color: colors.primary }}
          >
            {title} • {title} • {title} • {title} • {title} • {title} • {title}{' '}
            • {title} • {title} • {title} • {title} • {title} • {title} •{' '}
            {title} • {title} • {title} • {title} • {title} • {title} • {title}{' '}
            • {title} • {title} • {title} • {title} • {title} • {title} •{' '}
            {title} • {title} • {title} • {title} •{' '}
          </p>
          <p
            className='transition-colors-all whitespace-nowrap animation-slider'
            style={{ color: colors.primary }}
          >
            {title} • {title} • {title} • {title} • {title} • {title} • {title}{' '}
            • {title} • {title} • {title} • {title} • {title} • {title} •{' '}
            {title} • {title} • {title} • {title} • {title} • {title} • {title}{' '}
            • {title} • {title} • {title} • {title} • {title} • {title} •{' '}
            {title} • {title} • {title} • {title} •{' '}
          </p>
        </div>
        <div className='flex flex-col justify-between h-full pt-10 p-6'>
          <div className='flex w-full gap-10 h-[50vh] pr-4'>
            {images.map((src, index) => (
              <div
                key={index}
                className={clsx(
                  index == 0 ? 'w-full' : 'w-1/3',
                  'h-full transition-all hover:w-full'
                )}
              >
                <img
                  ref={(el) => (imagesRef.current[index] = el)}
                  className={clsx(
                    'w-full h-full object-cover rounded-main image'
                  )}
                  style={{ boxShadow: `14px 14px 0px 0px ${colors.primary}` }}
                  src={src ? src : ''}
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
                    ref={(el) => (textRef.current[index] = el)}
                    className='inline-block'
                  >
                    {letter == ' ' ? '\u00A0' : letter}
                  </span>
                ))}
              </p>
              <h1
                className='clash-display w-full whitespace-nowrap font-black text-[8vw] leading-none transition-colors-all'
                style={{ color: colors.primary }}
              >
                {title}
              </h1>
            </div>
            <Arrow
              onClick={() => {
                // setActive(active >= elementsLength - 1 ? 0 : active + 1);
                changeElement(active >= elementsLength - 1 ? 0 : active + 1);
              }}
              color={colors.primary}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
