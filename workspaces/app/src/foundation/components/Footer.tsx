import { useSetAtom } from 'jotai';
import React, { useCallback, useEffect, useId } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { useResource } from '../hooks/useResource';
import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

export const Footer: React.FC = () => {
  const term = useResource('/assets/texts/term.txt');
  const contact = useResource('/assets/texts/contact.txt');
  const question = useResource('/assets/texts/question.txt');
  const company = useResource('/assets/texts/company.txt');
  const overview = useResource('/assets/texts/overview.txt');

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const handleRequestToTermDialogOpen = useCallback(() => {
    updateDialogContent(
      <_Content aria-labelledby={termDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={termDialogA11yId} typography={Typography.NORMAL16}>
          利用規約
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {term}
        </Text>
      </_Content>,
    );
  }, [term, termDialogA11yId, updateDialogContent]);

  const handleRequestToContactDialogOpen = useCallback(() => {
    updateDialogContent(
      <_Content aria-labelledby={contactDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={contactDialogA11yId} typography={Typography.NORMAL16}>
          お問い合わせ
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {contact}
        </Text>
      </_Content>,
    );
  }, [contact, contactDialogA11yId, updateDialogContent]);

  const handleRequestToQuestionDialogOpen = useCallback(() => {
    updateDialogContent(
      <_Content aria-labelledby={questionDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={questionDialogA11yId} typography={Typography.NORMAL16}>
          Q&A
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {question}
        </Text>
      </_Content>,
    );
  }, [question, questionDialogA11yId, updateDialogContent]);

  const handleRequestToCompanyDialogOpen = useCallback(() => {
    updateDialogContent(
      <_Content aria-labelledby={companyDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
          運営会社
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {company}
        </Text>
      </_Content>,
    );
  }, [company, companyDialogA11yId, updateDialogContent]);

  const handleRequestToOverviewDialogOpen = useCallback(() => {
    updateDialogContent(
      <_Content aria-labelledby={overviewDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={overviewDialogA11yId} typography={Typography.NORMAL16}>
          Cyber TOONとは
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {overview}
        </Text>
      </_Content>,
    );
  }, [overview, overviewDialogA11yId, updateDialogContent]);

  useEffect(() => {
    const dialog = document.getElementById('dialog-container');
    if (!dialog) return;
    const label = dialog.querySelector('h2')?.textContent;

    if (term && label === '利用規約') handleRequestToTermDialogOpen();
    if (contact && label === 'お問い合わせ') handleRequestToContactDialogOpen();
    if (question && label === 'Q&A') handleRequestToQuestionDialogOpen();
    if (company && label === '運営会社') handleRequestToCompanyDialogOpen();
    if (overview && label === 'Cyber TOONとは') handleRequestToOverviewDialogOpen();
  }, [
    company,
    contact,
    handleRequestToCompanyDialogOpen,
    handleRequestToContactDialogOpen,
    handleRequestToOverviewDialogOpen,
    handleRequestToQuestionDialogOpen,
    handleRequestToTermDialogOpen,
    overview,
    question,
    term,
  ]);

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button disabled={!isClient} onClick={handleRequestToTermDialogOpen}>
            利用規約
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToContactDialogOpen}>
            お問い合わせ
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToQuestionDialogOpen}>
            Q&A
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToCompanyDialogOpen}>
            運営会社
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToOverviewDialogOpen}>
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
    </Box>
  );
};
