import InfoIcon from '@/assets/icons/info';

type ErrorMessageProps = {
  state: { success?: true } | { success?: false; error?: String };
};
function ErrorMessage({ state }: ErrorMessageProps) {
  if (state.success !== false) return null;

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-red-300 bg-red-50 px-4 py-2">
      <InfoIcon className="size-4.5 text-red-600" />
      <p className="text-red-600">{state.error}</p>
    </div>
  );
}

export default ErrorMessage;
