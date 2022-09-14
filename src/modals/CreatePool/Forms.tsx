// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useModal } from 'contexts/Modal';
import { useBalances } from 'contexts/Balances';
import { useApi } from 'contexts/Api';
import { useConnect } from 'contexts/Connect';
import { BondInputWithFeedback } from 'library/Form/BondInputWithFeedback';
import { useSubmitExtrinsic } from 'library/Hooks/useSubmitExtrinsic';
import { BondOptions } from 'contexts/Balances/types';
import { planckBnToUnit, unitToPlanckBn } from 'Utils';
import { EstimatedTxFee } from 'library/EstimatedTxFee';
import { ContentWrapper } from './Wrapper';
import { FooterWrapper, NotesWrapper } from '../Wrappers';

export const Forms = () => {
  const { api, network } = useApi();
  const { units } = network;
  const { setStatus: setModalStatus, setResize } = useModal();
  const { activeAccount, accountHasSigner } = useConnect();

  const { getBondOptions } = useBalances();
  const { freeBalance }: BondOptions = getBondOptions(activeAccount);

  // local bond value
  const [bond, setBond] = useState({
    bond: planckBnToUnit(freeBalance, units),
  });

  // bond valid
  const [bondValid, setBondValid] = useState<boolean>(true);

  // modal resize on form update
  useEffect(() => {
    setResize();
  }, [bond]);

  // tx to submit
  const tx = () => {
    let _tx = null;
    if (!bondValid || !activeAccount || !api) {
      return _tx;
    }

    // remove decimal errors
    const bondToSubmit = unitToPlanckBn(bond.bond, units);
    _tx = api.tx.nominationPools.create(
      bondToSubmit,
      activeAccount,
      activeAccount,
      activeAccount
    );
    return _tx;
  };

  const { submitTx, submitting } = useSubmitExtrinsic({
    tx: tx(),
    from: activeAccount,
    shouldSubmit: bondValid,
    callbackSubmit: () => {
      setModalStatus(0);
    },
    callbackInBlock: () => {},
  });

  const warnings = [];
  if (!accountHasSigner(activeAccount)) {
    warnings.push('Your account is read only, and cannot sign transactions.');
  }

  return (
    <ContentWrapper>
      <div>
        <>
          <BondInputWithFeedback
            bondType="pool"
            unbond={false}
            listenIsValid={setBondValid}
            defaultBond={planckBnToUnit(freeBalance, units)}
            setters={[
              {
                set: setBond,
                current: bond,
              },
            ]}
            warnings={warnings}
          />
          <NotesWrapper>
            <EstimatedTxFee />
          </NotesWrapper>
        </>
      </div>
      <FooterWrapper>
        <div>
          <button
            type="button"
            className="submit"
            onClick={() => submitTx()}
            disabled={
              submitting || !bondValid || !accountHasSigner(activeAccount)
            }
          >
            <FontAwesomeIcon
              transform="grow-2"
              icon={faArrowAltCircleUp as IconProp}
            />
            Submit
            {submitting && 'ting'}
          </button>
        </div>
      </FooterWrapper>
    </ContentWrapper>
  );
};

export default Forms;
