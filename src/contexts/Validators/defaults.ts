// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
/* eslint-disable @typescript-eslint/no-unused-vars */

import BigNumber from 'bignumber.js';
import type { ValidatorsContextInterface } from 'contexts/Validators/types';

export const defaultSessionParachainValidators = {
  list: [],
  unsub: null,
};

export const defaultExposureData = {
  exposures: [],
  notFullCommissionCount: 0,
  totalNonAllCommission: new BigNumber(0),
};

export const defaultValidatorsContext: ValidatorsContextInterface = {
  fetchValidatorMetaBatch: (k, v, r) => {},
  removeValidatorMetaBatch: (k) => {},
  fetchValidatorPrefs: async (v) => null,
  addFavorite: (a) => {},
  removeFavorite: (a) => {},
  validators: [],
  avgCommission: 0,
  meta: {},
  session: [],
  sessionParachain: [],
  favorites: [],
  nominated: null,
  poolNominated: null,
  favoritesList: null,
  validatorCommunity: [],
};
