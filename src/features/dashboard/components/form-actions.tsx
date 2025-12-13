import Button from '@/shared/components/button';

type Props = { label: string; disabled: boolean };

function FormActions({ label, disabled }: Props) {
  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-2 max-lg:w-full max-lg:flex-col-reverse">
        <button
          disabled={disabled}
          type="reset"
          className="button bg-transparent! font-normal text-current! max-lg:w-full"
        >
          Reset
        </button>
        <Button
          pending={disabled}
          className="flex items-center justify-center max-lg:w-full"
        >
          {label}
        </Button>
      </div>
    </div>
  );
}

export default FormActions;
