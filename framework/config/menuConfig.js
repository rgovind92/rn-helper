export default menuCode => {
  switch (menuCode) {
    case 'MOB010':
      return {
        key: 'Drop-off / Pick-up',
        id: 'DropOff',
        icon: 'list',
      };
    case 'MOB011':
      return {
        key: 'Load / Unload RFS',
        icon: 'chevron-left',
        id: 'LoadRFS',
      };
    case 'MOB012':
      return {
        key: 'Enquiry',
        id: 'Enquiry',
        icon: 'credit-card',
      };
    case 'MOB013':
      return {
        key: 'Other Purposes',
        id: 'OtherPurposes',
        icon: 'braille',
      };
    case 'MOBIMP':
      return {
        key: null,
        id: null,
        icon: null
      };
  }
};