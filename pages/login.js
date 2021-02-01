import { useState } from 'react';
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Page from '@/components/Page';
import { Button } from '@/components/Button';

export default function LoginPage() {
  const {
    handleSubmit,
    errors,
    register,
    formState: { isValid, isSubmitting },
  } = useForm({ mode: 'onChange' });
  const onSubmit = (data) => console.log(data);

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
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              isLoading={isSubmitting}
              type="submit"
              display="block"
              isDisabled={!isValid}
            >
              Continue
            </Button>
          </form>
        </Box>
      </Container>
    </Page>
  );
}
