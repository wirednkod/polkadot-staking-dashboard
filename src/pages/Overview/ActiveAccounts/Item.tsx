// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clipAddress, remToUnit } from '@polkadotcloud/utils';
import { useConnect } from 'contexts/Connect';
import { useNotifications } from 'contexts/Notifications';
import type { NotificationText } from 'contexts/Notifications/types';
import { Identicon } from 'library/Identicon';
import { useTranslation } from 'react-i18next';
import { ItemWrapper } from './Wrappers';
import type { ActiveAccountProps } from './types';

export const Item = ({ address, type }: ActiveAccountProps) => {
  const { t } = useTranslation('pages');
  const { addNotification } = useNotifications();
  const { getAccount } = useConnect();
  const accountData = getAccount(address);

  // click to copy notification
  let notification: NotificationText | null = null;
  if (accountData !== null) {
    notification = {
      title: t('overview.addressCopied'),
      subtitle: accountData.address,
    };
  }

  return (
    <ItemWrapper>
      <div className={`title${type ? ` ${type}` : null}`}>
        <h4>
          {accountData && (
            <>
              <div className="icon">
                <Identicon
                  value={accountData.address}
                  size={remToUnit('1.7rem')}
                />
              </div>
              {clipAddress(accountData.address)}
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(accountData.address);
                  if (notification) {
                    addNotification(notification);
                  }
                }}
              >
                <FontAwesomeIcon
                  className="copy"
                  icon={faCopy}
                  transform="shrink-2"
                />
              </button>
              {accountData.name !== clipAddress(accountData.address) && (
                <>
                  <div className="sep" />
                  <div className="rest">
                    <span className="name">{accountData.name}</span>
                  </div>
                </>
              )}
            </>
          )}

          {!accountData ? t('overview.noActiveAccount') : null}
        </h4>
      </div>
    </ItemWrapper>
  );
};
