// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PayeeItem, usePayeeConfig } from 'library/Hooks/usePayeeConfig';
import { HeaderWrapper } from './Wrappers';

export const Header = ({ current, selected }: any) => {
  const { getPayeeItems } = usePayeeConfig();

  const currentTitle =
    getPayeeItems(true).find((p: PayeeItem) => p.value === current)?.title ||
    '';

  const selectedTitle =
    getPayeeItems(true).find((p: PayeeItem) => p.value === selected)?.title ||
    '';

  return (
    <HeaderWrapper>
      <div>
        <h4>{currentTitle}</h4>
      </div>
      <span>
        <FontAwesomeIcon icon={faAnglesRight} />
      </span>
      <div>
        <h4>{selectedTitle}</h4>
      </div>
    </HeaderWrapper>
  );
};
