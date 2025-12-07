import Image from 'next/image';

import logoImg from '@/assets/images/logo.png';
import LoginForm from '@/features/auth/components/login-form';
import SidePanel from '@/features/auth/components/side-panel';

function HomePage() {
  return (
    <main className="container m-auto grid grid-cols-1 lg:grid-cols-2">
      <section className="w-full flex-1 px-4 lg:px-20 xl:px-24">
        <div className="m-auto flex min-h-screen w-full max-w-96 flex-col justify-center space-y-8 py-12 lg:w-96">
          <div className="flex items-center gap-2">
            <div className="relative size-7">
              <Image
                src={logoImg}
                alt=""
                aria-hidden
                fill
                sizes="28px"
                className="object-contain object-center"
              />
            </div>
            <h1 className="text-2xl font-bold">NovaBank</h1>
          </div>

          <div>
            <h2 className="text-heading text-primary text-3xl font-bold tracking-tight">
              Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your details to sign in.
            </p>

            <LoginForm />
          </div>
        </div>
      </section>

      <SidePanel />
    </main>
  );
}

export default HomePage;
