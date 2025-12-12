import { accountTypes } from '../data/account-types';

function AccountTypeSelector({ disabled }: { disabled: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <label>
        Account Type <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {accountTypes.map(({ id, name, description, icon: Icon }, i) => (
          <label aria-disabled={disabled} key={id} className="size-full">
            <input
              type="radio"
              name="accountType"
              defaultChecked={i === 0}
              disabled={disabled}
              value={id}
              className="peer sr-only"
            />
            <div className="bg-background peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary flex w-full cursor-pointer justify-between rounded-2xl border-2 border-transparent px-4 py-3 shadow transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-60">
              <div className="flex flex-col">
                <span className="font-semibold">{name}</span>
                <span className="text-xs text-gray-600">{description}</span>
              </div>
              <Icon className="size-5" />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default AccountTypeSelector;
