import '@/styles/global.css';
import Provider from './Provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body className='dark:text-white text-dark min-h-full dark:bg-zinc-900 bg-gray-200'>
        {
          /* @ts-expect-error Server Component */
          <Provider>{children}</Provider>
        }
      </body>
    </html>
  );
}
