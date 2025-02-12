'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { authFormSchema, parseStringify } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CustomInput from './CustomInput';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setuser] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsloading(true);
    try {
      if (type === 'sign-up') {
        const newUser = await signUp(data);
        setuser(newUser);
      }
      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }
  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href={''} className='cursor-pointer items-center gap-1 flex'>
          <Image
            src='/icons/logo.svg'
            width={34}
            height={34}
            alt='Higher Finance Logo'
          />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
            Higher
          </h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className='text-16 font-normal text-gray-600'>
              {user
                ? 'Link your account to get started'
                : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>{/* {Plaif Link} */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {type === 'sign-up' ? (
                <>
                  <div className='flex gap-4'>
                    <CustomInput
                      name='firstName'
                      label='First Name'
                      control={form.control}
                      placeholder='Enter your first name'
                    />
                    <CustomInput
                      name='lastName'
                      label='Last Name'
                      control={form.control}
                      placeholder='Enter your last name'
                    />
                  </div>
                  <CustomInput
                    name='address'
                    label='Address'
                    control={form.control}
                    placeholder='Enter your specific address'
                  />
                  <CustomInput
                    name='city'
                    label='City'
                    control={form.control}
                    placeholder='Enter your specific city'
                  />
                  <div className='flex gap-4'>
                    <CustomInput
                      name='state'
                      label='Stae'
                      control={form.control}
                      placeholder='ex: NY'
                    />
                    <CustomInput
                      name='postalCode'
                      label='Postal Code'
                      control={form.control}
                      placeholder='ex: 11101'
                    />
                  </div>
                  <div className='flex gap-4'>
                    <CustomInput
                      name='dateOfBirth'
                      label='Date of Birth'
                      control={form.control}
                      placeholder='yyyy-mm-dd'
                    />
                    <CustomInput
                      name='ssn'
                      label='SSN'
                      control={form.control}
                      placeholder='ex: 1234 '
                    />
                  </div>

                  <CustomInput
                    name='email'
                    label='Email'
                    control={form.control}
                    placeholder='Enter your Email'
                  />
                  <CustomInput
                    name='password'
                    label='Password'
                    control={form.control}
                    placeholder='Enter your Password'
                  />
                </>
              ) : (
                <>
                  <CustomInput
                    name='email'
                    label='Email'
                    control={form.control}
                    placeholder='Enter your Email'
                  />
                  <CustomInput
                    name='password'
                    label='Password'
                    control={form.control}
                    placeholder='Enter your Password'
                  />
                </>
              )}

              <div className='flex flex-col gap-4'>
                <Button type='submit' className='form-btn' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className='animate-spin' size={20} /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in' ? (
                    'Sign In'
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className='flex justify-center gap-1 items-center'>
            <p className='text-14 font-normal text-gray-600'>
              {type === 'sign-in'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>
            <Link
              className='form-link'
              href={type === 'sign-in' ? '/signup' : 'signin'}
            >
              {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
