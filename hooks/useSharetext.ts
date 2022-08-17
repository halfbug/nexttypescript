// import useAppContext from './useAppContext';
import useDeal from './useDeal';

export default function useSharetext() {
//   const { gsctx, dispatch, isGroupshop } = useAppContext();
  const { maxPercent, brandName } = useDeal();

  const socialText = `Shop ${brandName} on my Groupshop and get up to ${maxPercent} off`;
  const nativeShareText = `Shop ${brandName} on my Groupshop and get up to ${maxPercent} off`;

  return {
    socialText,
    nativeShareText,
  };
}
