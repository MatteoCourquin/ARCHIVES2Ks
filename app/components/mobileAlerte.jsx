const MobilAlert = ({ colors }) => {
  return (
    <div
      className='fixed w-screen h-screen z-[990] flex justify-center items-center lg:hidden transition-colors-all'
      style={{ backgroundColor: colors.secondary }}
    >
      <p
        className='clash-display font-black text-2xl text-center px-2 transition-colors-all'
        style={{ color: colors.primary }}
      >
        This website is only avaible on Desktop
      </p>
    </div>
  );
};

export default MobilAlert;
