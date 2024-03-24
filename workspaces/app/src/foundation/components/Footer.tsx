import { useSetAtom } from 'jotai';
import React, { useId, useState } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
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
  const [term, setTerm] = useState<string | null>(null);
  const [contact, setContact] = useState<string | null>(null);
  const [question, setQuestion] = useState<string | null>(null);
  const [company, setCompany] = useState<string | null>(null);
  const [overview, setOverview] = useState<string | null>(null);

  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const handleRequestToTermDialogOpen = async () => {
    const getTerm = async () => {
      if (term != null) return term;
      const res = await fetch('/assets/texts/term.txt');
      const newTerm = await res.text();
      setTerm(newTerm);
      return newTerm;
    };

    updateDialogContent(
      <_Content aria-labelledby={termDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={termDialogA11yId} typography={Typography.NORMAL16}>
          利用規約
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {await getTerm()}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToContactDialogOpen = async () => {
    const getContact = async () => {
      if (contact != null) return contact;
      const res = await fetch('/assets/texts/contact.txt');
      const newContact = await res.text();
      setContact(newContact);
      return newContact;
    };

    updateDialogContent(
      <_Content aria-labelledby={contactDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={contactDialogA11yId} typography={Typography.NORMAL16}>
          お問い合わせ
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {await getContact()}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToQuestionDialogOpen = async () => {
    const getQuestion = async () => {
      if (question != null) return question;
      const res = await fetch('/assets/texts/question.txt');
      const newQuestion = await res.text();
      setQuestion(newQuestion);
      return newQuestion;
    };

    updateDialogContent(
      <_Content aria-labelledby={questionDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={questionDialogA11yId} typography={Typography.NORMAL16}>
          Q&A
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {await getQuestion()}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToCompanyDialogOpen = async () => {
    const getCompany = async () => {
      if (company != null) return company;
      const res = await fetch('/assets/texts/company.txt');
      const newCompany = await res.text();
      setCompany(newCompany);
      return newCompany;
    };

    updateDialogContent(
      <_Content aria-labelledby={companyDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
          運営会社
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {await getCompany()}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToOverviewDialogOpen = async () => {
    const getOverview = async () => {
      if (overview != null) return overview;
      const res = await fetch('/assets/texts/overview.txt');
      const newOverview = await res.text();
      setOverview(newOverview);
      return newOverview;
    };

    updateDialogContent(
      <_Content aria-labelledby={overviewDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={overviewDialogA11yId} typography={Typography.NORMAL16}>
          Cyber TOONとは
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {await getOverview()}
        </Text>
      </_Content>,
    );
  };

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
