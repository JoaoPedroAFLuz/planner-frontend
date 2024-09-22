import { useApiFormErrors } from "@hooks/use-api-form-error";
import { Calendar } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface DatePickerButtonProps {
  name: string;
  displayedDate: string;
  isDisabled: boolean;
  openDatePicker: () => void;
}

export function DatePickerButton({
  name,
  displayedDate,
  isDisabled,
  openDatePicker,
}: DatePickerButtonProps) {
  const { getFieldState } = useFormContext();

  const fieldState = getFieldState(name);
  const apiError = useApiFormErrors();

  const isDataInvalid = fieldState.invalid || apiError?.errors?.[name];

  return (
    <div>
      <button
        type="button"
        disabled={isDisabled}
        data-invalid={isDataInvalid}
        onClick={openDatePicker}
        className="flex h-12 w-[275px] items-center gap-2 rounded-lg border border-zinc-900 bg-zinc-800 px-3 py-2 text-left text-zinc-50 focus-within:ring-2 focus-within:ring-pink-400 focus-within:ring-offset-2 focus-within:ring-offset-black data-[invalid=true]:ring-2 data-[invalid=true]:ring-red-600"
      >
        <Calendar className="size-5 text-zinc-400" />

        <span className="w-full flex-1 text-lg text-zinc-400">
          {displayedDate}
        </span>
      </button>

      {isDataInvalid && (
        <span className="text-xs text-red-600">Selecione uma data válida</span>
      )}
    </div>
  );
}
