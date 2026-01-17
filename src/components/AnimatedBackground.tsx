const AnimatedBackground = () => {
  const stripes = [
    { left: '5%', delay: '0s' },
    { left: '15%', delay: '0.5s' },
    { left: '25%', delay: '1s' },
    { left: '35%', delay: '0.3s' },
    { left: '45%', delay: '0.8s' },
    { left: '55%', delay: '0.2s' },
    { left: '65%', delay: '0.7s' },
    { left: '75%', delay: '0.4s' },
    { left: '85%', delay: '0.9s' },
    { left: '95%', delay: '0.6s' },
  ];

  return (
    <div className="animated-stripes">
      {stripes.map((stripe, index) => (
        <div
          key={index}
          className="stripe"
          style={{
            left: stripe.left,
            animationDelay: stripe.delay,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
