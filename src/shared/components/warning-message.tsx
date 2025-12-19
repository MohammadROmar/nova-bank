import InfoIcon from '@/assets/icons/info';

type WarningMessageProps = { text: string };

function WarningMessage({ text }: WarningMessageProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-yellow-300 bg-yellow-50 px-4 py-2">
      <InfoIcon className="size-4.5 shrink-0 text-yellow-600" />
      <p className="text-yellow-600">{text}</p>
    </div>
  );
}

export default WarningMessage;
