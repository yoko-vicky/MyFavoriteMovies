import { ChangeEvent, useEffect, useState } from 'react';
import { USER_BIO_MAX_LENGTH, formVal } from '@/constants';
import { ValidateMsgState, ValidateMsgTypeState } from '@/types';
import { removeExtraSpaceFromStr } from '@/utils';

const useBioField = (initialBio: string | null | undefined) => {
  const [bio, setBio] = useState<string>(initialBio || '');
  const [bioMsg, setBioMsg] = useState<ValidateMsgState | null>(null);

  const isBioOkay =
    bio === initialBio || bioMsg?.type === ValidateMsgTypeState.OK;

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
  };
};

export default useBioField;
