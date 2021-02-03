import { useState } from 'react';
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
import Page from '@/components/Page';
import { Button } from '@/components/Button';

export default function LoginPage() {
  // const steps = ['start', ['credentials', 'sign up']];
  const [currentStep, setCurrentStep] = useState('start');

  const auth = useAuth();
  const {
    handleSubmit,
    errors,
    register,
    formState: { isValid, isSubmitting },
  } = useForm({ mode: 'onChange' });

  const [showPasswordField, setShowPasswordField] = useState(false);

  const [showPasswordValue, setShowPasswordValue] = useState(false);
  const handlePasswordToggle = () => setShowPasswordValue(!showPasswordValue);

  const onSubmit = async (data) => {
    if (currentStep === 'start') {
      // setCurrentStep(steps[steps.indexOf(currentStep) + 1]);
      setIsDirtyEmail(false);
      setSubmittedEmail();
      const doesUserExist = await auth.doesUserExist(data.email);

      if (doesUserExist) {
        setCurrentStep('sign in');
        setShowPasswordField(true);
      } else {
        setCurrentStep('sign up');
        setShowPasswordField(true);
      }
    } else if (currentStep === 'sign up') {
      console.log(data);
    }
  };

  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isDirtyEmail, setIsDirtyEmail] = useState(false);

  const handleEmailChange = (event) => {
    if (
      (currentStep === 'sign in' || currentStep === 'sign up') &&
      submittedEmail !== event.target.value
    ) {
      setIsDirtyEmail(true);
      setSubmittedEmail('');
      setCurrentStep('start');
    }
  };

  // fetchSignInMethodsForEmail

  return (
    <Page name="Login" path="/login">
      <Container variant="narrow">
        <Box py={12}>
          <Heading as="h2" fontSize="lg" mb={4}>
            Sign up or log in
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormControl isRequired isInvalid={errors.email} mb={4}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                name="email"
                id="email"
                ref={register({
                  required: 'email address required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
                placeholder="e.g. name@example.com"
                onChange={handleEmailChange}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            {showPasswordField && !isDirtyEmail && (
              <FormControl isRequired isInvalid={errors.password} mb={4}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    id="password"
                    ref={register({
                      required: 'password required',
                    })}
                    type={showPasswordValue ? 'text' : 'password'}
                    pr="4.5rem"
                    placeholder="Password"
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
                    >
                      {showPasswordValue ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
            )}

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
