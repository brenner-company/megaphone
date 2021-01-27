import Header from '@/components/Header';
import { NextSeo } from 'next-seo';

export default function Page({ name, path, children }) {
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
  );
}
