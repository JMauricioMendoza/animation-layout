import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import styled from 'styled-components';
import animationData from '../assets/Animation.json';
 
const Animation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      animationData: animationData,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <Container ref={containerRef}/>
  );
};
 
export default Animation;

const Container = styled.div`
  bottom: 0;
  object-fit: cover;
  opacity: 1;
  position: absolute;
  right: 10px;
  width: 250px;
`;