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
import Page from '@/components/Page';
import { Button } from '@/components/Button';

export default function LoginPage() {
  // const steps = ['start', ['credentials', 'sign up']];
  const [currentStep, setCurrentStep] = useState('start');

  const router = useRouter();

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

  const [showUsernameField, setShowUsernameField] = useState(false);

  const onSubmit = async (data) => {
    switch (currentStep) {
      case 'start': {
        // setIsDirtyEmail(false);
        setSubmittedEmail();

        const { email } = data;
        const doesUserExist = await auth.doesUserExist(email);

        if (doesUserExist) {
          setCurrentStep('sign in');
          setShowPasswordField(true);
        } else {
          setCurrentStep('sign up');
          setShowUsernameField(true);
          setShowPasswordField(true);
        }

        break;
      }

      case 'sign in': {
        const { email, password } = data;
        auth.signin(email, password).then(() => {
          router.push('/');
        });
        break;
      }

      case 'sign up': {
        const { email, password, username } = data;
        auth.signup(email, password, username).then(() => {
          console.log(`inside sign up: ${auth.user.displayName}`);
          router.push('/');
        });
        break;
      }

      default:
        break;
    }
  };

  const [submittedEmail, setSubmittedEmail] = useState('');
  // const [isDirtyEmail, setIsDirtyEmail] = useState(false);

  const handleEmailChange = (event) => {
    if (
      (currentStep === 'sign in' || currentStep === 'sign up') &&
      submittedEmail !== event.target.value
    ) {
      switch (currentStep) {
        case 'sign in': {
          setShowPasswordField(false);
          break;
        }

        default: {
          setShowUsernameField(false);
          setShowPasswordField(false);
          break;
        }
      }
      // setIsDirtyEmail(true);
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
                  required: 'Email address required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                placeholder="e.g. name@example.com"
                onChange={handleEmailChange}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            {/* && !isDirtyEmail */}
            {showUsernameField && (
              <FormControl isRequired isInvalid={errors.username} mb={4}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  name="username"
                  id="username"
                  ref={register({
                    required: 'Username required',
                  })}
                  placeholder="Username"
                />

                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
            )}

            {showPasswordField && (
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
                  {errors.password && errors.password.message}
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
