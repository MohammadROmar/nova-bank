'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Search from '@/assets/icons/search';

export default function UserSearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get('username') ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (value) {
      params.set('username', value);
    } else {
      params.delete('username');
    }

    router.push(`/dashboard/accounts?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-gray-600" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input pl-12 lg:max-w-[50%]"
        placeholder="Search username..."
      />
    </form>
  );
}
