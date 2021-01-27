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
  const { handleSubmit, errors, register, formState } = useForm();
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
                ref={register({ required: true })}
                placeholder="e.g. name@example.com"
              />
              <FormErrorMessage>
                {errors.email && 'This is an error!'}
              </FormErrorMessage>
            </FormControl>
            <Button
              isLoading={formState.isSubmitting}
              type="submit"
              display="block"
            >
              Continue
            </Button>
          </form>
        </Box>
      </Container>
    </Page>
  );
}
