import type { DetailProps } from '../utils/get-account-details';

function Detail({ icon: Icon, label, value }: DetailProps) {
  return (
    <div className="flex flex-col border-b border-b-gray-200 py-2">
      <div className="flex items-center gap-2 text-gray-600">
        <Icon className="size-4" />
        <p className="text-xs">{label}</p>
      </div>
      <p>{value}</p>
    </div>
  );
}

export default Detail;
