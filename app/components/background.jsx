const Background = ({ color, refBackground }) => {
  return (
    <div
      className='fixed top-[50vh] left-[50vw] w-[250vw] h-[250vw] min-w-[250vw] min-h-[250vh] -translate-x-1/2 -translate-y-1/2'
      ref={refBackground}
    >
      <svg
        viewBox='0 0 1114 1114'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='transition-colors-all'
      >
        <rect width='1114' height='1114' fill='url(#paint0_radial_187_45)' />
        <defs>
          <radialGradient
            id='paint0_radial_187_45'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(557 557) rotate(90) scale(557)'
          >
            <stop
              className='transition-colors-all'
              stopColor={color}
              stopOpacity='0'
            />
            <stop
              className='transition-colors-all'
              offset='0.20'
              stopColor={color}
              stopOpacity='0.9'
            />
            <stop
              className='transition-colors-all'
              offset='0.25'
              stopColor={color}
            />
            <stop
              className='transition-colors-all'
              offset='1'
              stopColor={color}
            />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Background;
