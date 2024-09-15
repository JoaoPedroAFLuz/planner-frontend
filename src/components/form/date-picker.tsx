import { X } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { Controller } from "react-hook-form";

interface DatePickerProps {
  name: string;
  onCloseDatePicker: () => void;
}

export function DatePicker({ name, onCloseDatePicker }: DatePickerProps) {
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60">
            <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Selecione a data</h2>

                  <button type="button" onClick={onCloseDatePicker}>
                    <X className="size-5 cursor-pointer text-zinc-400" />
                  </button>
                </div>
              </div>

              <div className="h-px w-full bg-zinc-800" />

              <DayPicker mode="range" selected={value} onSelect={onChange} />
            </div>
          </div>
        );
      }}
    />
  );
}
