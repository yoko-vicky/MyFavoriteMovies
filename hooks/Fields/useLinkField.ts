import { ChangeEvent, useEffect, useState } from 'react';
import { REGEX_URL, formVal } from '@/constants';
import { ValidateMsgState, ValidateMsgTypeState } from '@/types';

const useLinkField = (initialLink: string | undefined | null) => {
  const [link, setLink] = useState<string>(initialLink || '');
  const [linkMsg, setLinkMsg] = useState<ValidateMsgState | null>(null);
  const [isCorrectLetters, setIsCorrectLetters] = useState<boolean>(false);

  const isLinkOkay =
    !link ||
    (!!link && link.length === 0) ||
    link === initialLink ||
    linkMsg?.type === ValidateMsgTypeState.OK;

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkMsg(null);

    const newLink = e.target.value.replaceAll(' ', '');
    setLink(newLink);

    const isCorrectLetters = newLink.match(REGEX_URL);

    if (!isCorrectLetters) {
      setLinkMsg({
        msg: formVal.userProfileEdit.links.invalidLink,
        type: ValidateMsgTypeState.ERROR,
      });
      setIsCorrectLetters(false);
      return;
    } else {
      setIsCorrectLetters(true);
    }
  };

  const validateLink = () => {
    const newLink = link ? link.trim().replaceAll(' ', '') : '';
    setLink(newLink);

    if (newLink.length === 0) {
      setLinkMsg(null);
      return;
    }

    const isCorrectUrl = newLink.match(REGEX_URL);

    if (!isCorrectUrl) {
      setLinkMsg({
        msg: formVal.userProfileEdit.links.invalidLink,
        type: ValidateMsgTypeState.ERROR,
      });
      setIsCorrectLetters(false);
      return;
    }

    if (link === initialLink || (!!isCorrectUrl && isCorrectLetters)) {
      setLinkMsg({
        msg: formVal.userProfileEdit.common.ok,
        type: ValidateMsgTypeState.OK,
      });
    }
  };

  const clearLinkField = () => {
    setLink(initialLink || '');
    setLinkMsg(null);
    setIsCorrectLetters(false);
  };

  useEffect(() => {
    if (!initialLink) return;
    setLink(initialLink);
  }, [initialLink]);

  return {
    link,
    handleLinkChange,
    linkMsg,
    isLinkOkay,
    validateLink,
    clearLinkField,
  };
};

export default useLinkField;
