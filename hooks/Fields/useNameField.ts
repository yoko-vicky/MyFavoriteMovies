import { ChangeEvent, useEffect, useState } from 'react';
import { REGEX_USER_NAME, USER_NAME_MAX_LENGTH, formVal } from '@/constants';
import { ValidateMsgState, ValidateMsgTypeState } from '@/types';
import { removeExtraSpaceFromStr } from '@/utils';

const useNameField = (initialName: string | null | undefined) => {
  const [name, setName] = useState<string>('');
  const [nameMsg, setNameMsg] = useState<ValidateMsgState | null>(null);

  const isNameOkay =
    name === initialName || nameMsg?.type === ValidateMsgTypeState.OK;

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const isCorrectLetters = newName.split('').every((letter: string) => {
      return letter.match(REGEX_USER_NAME);
    });

    if (!isCorrectLetters) {
      setNameMsg({
        msg: formVal.userProfileEdit.name.characters,
        type: ValidateMsgTypeState.ERROR,
      });
      return;
    }

    setName(newName);
  };

  const resetNameMsg = () => {
    setNameMsg(null);
  };

  const clearNameField = () => {
    setName(initialName || '');
    setNameMsg(null);
  };

  const validateName = () => {
    const newName = removeExtraSpaceFromStr(name);
    setName(newName);

    setNameMsg(null);

    const isCorrectLength =
      newName.length > 0 && newName.length <= USER_NAME_MAX_LENGTH;

    if (!isCorrectLength) {
      setNameMsg({
        msg: formVal.userProfileEdit.name.letterNum,
        type: ValidateMsgTypeState.ERROR,
      });
      return;
    }

    if (isCorrectLength && newName.length > 0) {
      setNameMsg({
        msg: formVal.userProfileEdit.common.ok,
        type: ValidateMsgTypeState.OK,
      });
    }
  };

  useEffect(() => {
    if (!initialName) return;
    setName(initialName);
  }, [initialName]);

  return {
    name,
    isNameOkay,
    handleChangeName,
    nameMsg,
    resetNameMsg,
    validateName,
    clearNameField,
  };
};

export default useNameField;
