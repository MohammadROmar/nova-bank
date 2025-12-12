function SelectorSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-2">
      <div className="h-6 w-12 animate-pulse rounded-2xl bg-gray-300" />
      <div className="h-9 w-full animate-pulse rounded-2xl bg-gray-300" />
    </div>
  );
}

export default SelectorSkeleton;
