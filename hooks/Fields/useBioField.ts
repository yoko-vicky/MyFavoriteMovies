import { ChangeEvent, useEffect, useState } from 'react';
import { USER_BIO_MAX_LENGTH, formVal } from '@/constants';
import { ValidateMsgState, ValidateMsgTypeState } from '@/types';
import { removeExtraSpaceFromStr } from '@/utils';
import { logger } from '@/utils/logger';
import _ from 'lodash';

const useBioField = (defaultBio: string | null | undefined) => {
  const initialBio = defaultBio ? _.unescape(defaultBio) : '';
  const [bio, setBio] = useState<string>(initialBio || '');
  const [bioMsg, setBioMsg] = useState<ValidateMsgState | null>(null);

  logger.log({ defaultBio, initialBio, bio });
  const isBioOkay =
    bio === initialBio ||
    bio.length === 0 ||
    bioMsg?.type === ValidateMsgTypeState.OK;

  const escapedBio = !!bio && isBioOkay && _.escape(bio);

  const handleChangeBio = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBioMsg(null);
    const newBio = e.target.value;
    setBio(newBio);
  };

  const resetBioMsg = () => {
    setBioMsg(null);
  };

  const validateBio = () => {
    const newBio = removeExtraSpaceFromStr(bio);
    setBio(newBio);

    setBioMsg(null);

    const isCorrectLength = newBio.length <= USER_BIO_MAX_LENGTH;

    if (!isCorrectLength) {
      setBioMsg({
        msg: formVal.userProfileEdit.bio.characters,
        type: ValidateMsgTypeState.ERROR,
      });
      return;
    }

    if (isCorrectLength && newBio.length > 0) {
      setBioMsg({
        msg: formVal.userProfileEdit.common.ok,
        type: ValidateMsgTypeState.OK,
      });
    }
  };

  const clearBioField = () => {
    setBio(initialBio || '');
    setBioMsg(null);
  };

  useEffect(() => {
    if (!initialBio) return;
    setBio(initialBio);
  }, [initialBio]);

  return {
    bio,
    handleChangeBio,
    bioMsg,
    resetBioMsg,
    validateBio,
    clearBioField,
    isBioOkay,
    escapedBio,
  };
};

export default useBioField;
