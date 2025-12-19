import Link from 'next/link';

import SearchOff from '@/assets/icons/search-off';

async function NotFoundPage() {
  return (
    <section className="flex size-full h-screen w-screen flex-col items-center justify-center gap-4 text-center text-balance">
      <div className="bg-primary/10 flex items-center justify-center rounded-full p-3">
        <SearchOff className="text-primary size-8" />
      </div>

      <h2 className="text-primary text-3xl font-bold">Oops! Page Not Found</h2>
      <p className="max-w-xl text-sm text-gray-600">
        The page you are looking for doesn&apos;t exist or has been removed.
        Please check the URL or return Home.
      </p>

      <Link href="/" className="button w-fit text-nowrap">
        Go Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
