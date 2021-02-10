import { useState, useEffect } from 'react';
import firebase from '@/lib/firebase';
import { useAuth } from '@/lib/auth';
import { NextSeo } from 'next-seo';
import Header from '@/components/Header';
import { Container, Flex, Box, Icon, Text } from '@chakra-ui/react';
import { RiAdminLine, RiEmotionUnhappyLine } from 'react-icons/ri';

export default function Page({ name, path, requiresAuth = false, children }) {
  const auth = useAuth();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (requiresAuth) {
      const unsubscribeAuthStateChanged = firebase
        .auth()
        .onAuthStateChanged((user) => {
          setIsCheckingAuth(false);
          if (user) {
            setIsAuthorized(true);
            unsubscribeAuthStateChanged();
          }
        });

      return () => unsubscribeAuthStateChanged();
    }
  }, []);

  const title = `Megaphone – ${name}`;
  const url = `https://megaphone.com${path}`;

  return (
    <>
      {requiresAuth && isCheckingAuth ? (
        <></>
      ) : (
        <>
          <NextSeo
            title={title}
            canonical={url}
            openGraph={{
              url,
              title,
            }}
          />
          <Header />
          {requiresAuth && !isAuthorized ? (
            <>
              <Container variant="narrow">
                <Box py={[12, 24]}>
                  <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Icon
                      as={RiAdminLine}
                      boxSize={24}
                      color="gray.300"
                      mb={4}
                    />
                    <Text textAlign="center" color="gray.400" fontWeight="bold">
                      Hmm, you don&apos;t seem to be authorized to view this
                      page.
                      <br />
                      <br />
                      Try logging in or signing up.
                    </Text>
                  </Flex>
                </Box>
              </Container>
            </>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </>
  );
}
