// Deprecated

/* TODO: investigate the root cause of unnecessary renders here:
A state change anywhere above this component seems to cause avoidable renders here.
This component provides a great syntax to position, color and pad Views, but I'm reluctant to
use this until the unnecessary renders are gone.  */
import styled from 'styled-components';
import is from 'styled-is';

export default styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: stretch;

  ${is('row')`
    flex-direction: row; 
  `};

  ${is('rowReverse')`
    flex-direction: row-reverse;
  `};

  ${is('column')`
    flex-direction: column;
  `};

  ${is('columnReverse')`
    flex-direction: column-reverse;
  `};

  ${is('nowrap')`
    flex-wrap: nowrap; /* default */
  `};  

  ${is('wrap')`
    flex-wrap: wrap;
  `};

  ${is('justifyStart')`
    justify-content: flex-start; /* default */
  `};

  ${is('justifyEnd')`
    justify-content: flex-end;
  `};
  
  ${is('justifyCenter')`
    justify-content: center;
  `};

  ${is('justifyBetween')`
    justify-content: space-between;
  `};

  ${is('justifyAround')`
    justify-content: space-around;
  `};

  ${is('alignStart')`
    align-items: flex-start;
  `};

  ${is('alignEnd')`
    align-items: flex-end;
  `};

  ${is('alignCenter')`
    align-items: center;
  `};

  ${is('center')`
    align-items: center;
    justify-content: center;
  `};

  ${is('alignBaseline')`
    align-items: baseline;
  `};

  ${is('alignStretch')`
    align-items: stretch;
  `};

  ${is('contentStart')`
    align-content: flex-start;
  `};

  ${is('contentEnd')`
    align-content: flex-end;
  `};

  ${is('contentCenter')`
    align-content: center;
  `};

  ${is('contentSpaceBetween')`
    align-content: space-between;
  `};
  
  ${is('contentSpaceAround')`
    align-content: space-around;
  `};

  ${is('contentStretch')`
    align-content: stretch; /* default */
  `};

  ${is('full')`
    flex: 1;
  `};

  ${is('pad')`
    padding-right: 8;
    padding-bottom: 8;
    padding-left: 8;
    padding-top: 8;
  `};

  ${is('pad-h')`
    padding-right: 8;
    padding-left: 8;
  `};

  ${is('pad-t')`
    padding-top: 8;
    padding-right: 8;
  `};

  ${is('pad-l')`
    padding-right: 16;
    padding-bottom: 16;
    padding-left: 16;
    padding-top: 16;
  `};

  ${is('pad-l-h')`
    padding-right: 16;
    padding-left: 16;
  `};

  ${is('pad-l-t')`
    padding-top: 16;
    padding-right: 16;
  `};

  ${is('wrapReverse')`
    flex-wrap: wrap-reverse;
  `};

  ${is('inline')`
    display: inline-flex;
  `};
`;
