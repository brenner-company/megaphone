import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import Header from '@/components/Header';
import { NextSeo } from 'next-seo';

export default function Page({ name, path, requiresAuth = false, children }) {
  const router = useRouter();
  const auth = useAuth();

  const title = `Megaphone – ${name}`;
  const url = `https://megaphone.com${path}`;

  return (
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
      {children}
    </>
    //   <>
    //   {!requiresAuth || (requiresAuth && auth.user) ? (
    //     <>
    //       <NextSeo
    //         title={title}
    //         canonical={url}
    //         openGraph={{
    //           url,
    //           title,
    //         }}
    //       />
    //       <Header />
    //       {children}
    //     </>
    //   ) : (
    //     <>{router.push('/login')}</>
    //   )}
    // </>
  );
}
