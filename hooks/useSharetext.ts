// import useAppContext from './useAppContext';
import useDeal from './useDeal';

export default function useSharetext() {
//   const { gsctx, dispatch, isGroupshop } = useAppContext();
  const { maxPercent, brandName, isDrops } = useDeal();

  const socialText = `Shop ${brandName} on my ${isDrops ? 'Groupshop' : 'Microstore'} and get up to ${maxPercent} off`;
  const nativeShareText = `Shop ${brandName} on my ${isDrops ? 'Groupshop' : 'Microstore'} and get up to ${maxPercent} off`;

  return {
    socialText,
    nativeShareText,
  };
}
