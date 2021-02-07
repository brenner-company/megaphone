import { useState, useEffect } from 'react';
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
import { DevTool } from '@hookform/devtools';
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
    trigger,
    reset,
    control,
    formState: { isValid, isSubmitting },
  } = useForm({ mode: 'onChange' });

  const [showPasswordField, setShowPasswordField] = useState(false);

  const [showPasswordValue, setShowPasswordValue] = useState(false);
  const handlePasswordToggle = () => setShowPasswordValue(!showPasswordValue);

  const [showUsernameField, setShowUsernameField] = useState(false);

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const onSubmit = async (data) => {
    switch (currentStep) {
      case 'start': {
        const { email } = data;
        const doesUserExist = await auth.doesUserExist(email);

        setSubmittedEmail(email);

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
        setSubmittedPassword(password);
        if (email === 'tiene@brenner.company') {
          setInvalidCredentials(true);
        } else {
          try {
            await auth.signin(email, password);
            router.push('/');
          } catch ({ code }) {
            if (code === 'auth/wrong-password') {
              // TODO: 'auth/too-many-requests' needs to be catched, maybe 'auth/invalid-email' too
              setInvalidCredentials(true);
            }
          }
        }
        break;
      }

      case 'sign up': {
        const { email, password, username } = data;
        await auth.signup(email, password, username);
        router.push('/');
        break;
      }

      default:
        break;
    }
  };

  const [submittedEmail, setSubmittedEmail] = useState('');
  const [submittedPassword, setSubmittedPassword] = useState('');

  const handleEmailChange = async (event) => {
    console.log('emailchange');
    if (
      (currentStep === 'sign in' || currentStep === 'sign up') &&
      submittedEmail !== event.target.value
    ) {
      switch (currentStep) {
        case 'sign in': {
          console.log('emailchange: step: sign in');
          if (invalidCredentials) {
            console.log('emailchange: reset credentials validation');
            setInvalidCredentials(false);
          }
          // reset('password');
          setShowPasswordField(false);
          setSubmittedPassword('');
          break;
        }

        case 'sign up': {
          setShowUsernameField(false);
          setShowPasswordField(false);
          break;
        }

        default:
          break;
      }

      console.log('emailchange: step: sign in - end');
      setSubmittedEmail('');
      setCurrentStep('start');
    }
  };

  const handlePasswordChange = (event) => {
    console.log('passwordchange');
    if (
      currentStep === 'sign in' &&
      invalidCredentials &&
      submittedPassword !== event.target.value
    ) {
      console.log('password change: step: sign in');
      setInvalidCredentials(false);
      setSubmittedPassword('');
    }
  };

  useEffect(() => {
    // trigger('email');
    trigger('password');
  }, [invalidCredentials]);

  useEffect(() => {
    console.log(currentStep);
  }, [currentStep]);

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
                      validate: {
                        validatedCredentials: () =>
                          !invalidCredentials ||
                          `Hmm, we couldn't find this email / password combination in our records. Try again.`,
                      },
                    })}
                    type={showPasswordValue ? 'text' : 'password'}
                    pr="4.5rem"
                    placeholder="Password"
                    onChange={handlePasswordChange}
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
          <DevTool control={control} />
        </Box>
      </Container>
    </Page>
  );
}
