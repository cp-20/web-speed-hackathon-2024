import styled from 'styled-components';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  aspect-ratio: 16 / 9;
  width: 100%;
`;

export const HeroImage: React.FC = () => {
  return (
    <_Wrapper>
      <_Image
        alt="Cyber TOON"
        decoding="async"
        loading="eager"
        sizes="(max-width: 1024px) 100vw, 1024px"
        src="/assets/images/hero_1024.avif"
        srcSet="/assets/images/hero_256.avif 256w,/assets/images/hero_384.avif 384w,/assets/images/hero_512.avif 512w,/assets/images/hero_768.avif 768w,/assets/images/hero_1024.avif 1024w"
      />
    </_Wrapper>
  );
};
