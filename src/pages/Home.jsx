import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Quiz from '../components/Quiz';

const Home = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    console.log(document);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error(`Error attempting to enable full-screen mode: ${err.message}`));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error(`Error attempting to exit full-screen mode: ${err.message}`));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
     

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
       
    };
  }, []);

  return (
    <div>
      <Navbar />
      {
        isFullscreen ? 
          <Quiz /> :
          <div className='w-full h-screen flex justify-center items-center'>
            <div className='flex gap-10 p-6 flex-col items-center max-w-screen-md mx-auto text-center rounded-lg shadow-lg'>
              <h3 className='font-bold text-3xl'>Switch to Full Screen for Quiz</h3>
              <button
                onClick={toggleFullscreen}
                className='bg-red-500 p-2 rounded-lg text-black font-medium text-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
                Switch
              </button>
            </div>
          </div>
      }
    </div>
  );
}

export default Home;
