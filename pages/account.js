import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
// import { DevTool } from '@hookform/devtools';
import Page from '@/components/Page';
import { Button } from '@/components/Button';

export default function AccountPage() {
  const router = useRouter();

  const auth = useAuth();
  const {
    handleSubmit,
    errors,
    register,
    formState: { isValid, isDirty, isSubmitting },
  } = useForm();

  const [showPasswordValue, setShowPasswordValue] = useState(false);
  const handlePasswordToggle = () => setShowPasswordValue(!showPasswordValue);

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const onSubmit = (data) => {};

  return (
    <Page name="Account" path="/account" requiresAuth>
      <Container variant="narrow">
        <Box py={[6, 12]}>
          <Heading as="h2" fontSize="lg" mb={4}>
            Reset password
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormControl isRequired isInvalid={errors.password} mb={4}>
              <FormLabel htmlFor="current-password">Current password</FormLabel>
              <InputGroup>
                <Input
                  name="current-password"
                  id="current-password"
                  ref={register({
                    required: 'Password required',
                    validate: {
                      validCredentials: () =>
                        !invalidCredentials ||
                        `Hmm, we couldn't find this email / password combination in our records. Try again.`,
                    },
                  })}
                  type={showPasswordValue ? 'text' : 'password'}
                  pr="4.5rem"
                  placeholder="Password"
                  isDisabled
                />
                <InputRightElement
                  width="4.5rem"
                  justifyContent="flex-end"
                  paddingRight="6px"
                >
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handlePasswordToggle}
                    isDisabled
                  >
                    {showPasswordValue ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isValid}
              display="block"
              width="100%"
            >
              Continue
            </Button>
          </form>
        </Box>
      </Container>
    </Page>
  );
}
