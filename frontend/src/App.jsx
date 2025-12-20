import LaserFlow from './Hero';
import { useRef } from 'react';
import image from './assets/background-image.png'
import FluidGlass from './FluidGlass';
import CardNav from './navbar';

// NOTE: You can also adjust the variables in the shader for super detailed customization

// Basic Usage
<div style={{ height: '500px', position: 'relative', overflow: 'hidden' }}>
  <LaserFlow />
</div>

// Image Example Interactive Reveal Effect
export default function App() {
  const revealImgRef = useRef(null);

  // Navigation data for CardNav
  const navItems = [
    {
      label: 'Features',
      bgColor: 'transparent',
      textColor: '#000000ff',
      border: '1px solid #000000ff',
      links: [
        { label: 'Transit Tracking', href: '#tracking', ariaLabel: 'View transit tracking features' },
        { label: 'Payment System', href: '#payment', ariaLabel: 'View payment system' },
        { label: 'Route Planning', href: '#routes', ariaLabel: 'View route planning' }
      ]
    },
    {
      label: 'About',
      bgColor: 'transparent',
      textColor: '#000000ff',
      border: '1px solid #000000ff',
      links: [
        { label: 'Our Mission', href: '#mission', ariaLabel: 'Learn about our mission' },
        { label: 'Team', href: '#team', ariaLabel: 'Meet the team' }
      ]
    },
    {
      label: 'Contact',
      bgColor: 'transparent',
      textColor: '#000000ff',
      border: '1px solid #000000ff',
      links: [
        { label: 'Get in Touch', href: '#contact', ariaLabel: 'Contact us' },
        { label: 'Support', href: '#support', ariaLabel: 'Get support' }
      ]
    }
  ];

  return (
    <div
      style={{
        height: '800px',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#060010'
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', `${x}px`);
          el.style.setProperty('--my', `${y}px`);
        }
      }}
      onMouseLeave={() => {
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', '-9999px');
          el.style.setProperty('--my', '-9999px');
        }
      }}
    >
      {/* CardNav Navbar */}
      <CardNav
        logo="/public/images/transitpay-logo.png"
        logoAlt="TransitPay Logo"
        items={navItems}
        baseColor="#DFFAFA"
        menuColor="#060010"
        buttonBgColor="#000000"
        buttonTextColor="#ffffff"
      />

      <LaserFlow
        horizontalBeamOffset={0.23}
        verticalBeamOffset={0.0}
        color="#69bdfaff"
      />

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '86%',
        height: '60%',
        backgroundColor: '#000000',
        borderRadius: '20px',
        border: '2px solid #dbdbdbff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: 'white',
        fontSize: '2rem',
        zIndex: 6,
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)'
      }}>
        <FluidGlass />
      </div>

      <img
        ref={revealImgRef}
        src={image}
        alt="Reveal effect"
        style={{
          position: 'absolute',
          width: '100%',
          height: '60%',
          objectFit: 'cover',
          top: '0',
          left: '0',
          zIndex: 5,
          mixBlendMode: 'lighten',
          opacity: 0.3,
          pointerEvents: 'none',
          '--mx': '-9999px',
          '--my': '-9999px',
          WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      />
    </div>
  );
}