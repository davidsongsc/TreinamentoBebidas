import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  return (
    <header style={{
      display: 'flex',
      background: 'whitesmoke',
      boxShadow: '1px 1px 5px #00000047',
      width: '100%',
      top: '-5px',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      position: 'fixed',
    }}>

      <div className="logo">
        <h1 className="texto-logo"
          style={{
            fontFamily: 'inherit',
            letterSpacing: '5px',
            fontWeight: '100',
            textTransform: 'uppercase'
          }}>Treinamento</h1>

      </div>

      <div style={{display:'flex', flexDirection: 'column'}}>

        <button onClick={handleFullscreenToggle}>
          {isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia'}
        </button>
        <button onClick={handleScrollDown}>↓</button>
        <button onClick={handleScrollUp}>↑</button>
      </div>
    </header>
  );
};

export default Header;
