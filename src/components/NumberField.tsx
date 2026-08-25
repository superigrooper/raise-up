import { NumberFieldProps } from "@/types/poker"; 


const INPUT_CLASS = `
  w-24 text-center py-1.5 px-3 rounded-md border outline-none
  bg-gray-50 dark:bg-[#0f0f1b] navy:bg-[#0b0b14]
  border-gray-300 dark:border-gray-800 navy:border-slate-800
  text-gray-900 dark:text-white navy:text-slate-100
  focus:border-[#e94560] transition-colors
`;

export default function NumberField({
  id,
  label,
  value,
  min = 0,
  onChange,
}: NumberFieldProps) {
  return (
    <div className="flex justify-between items-center">
      <label
        htmlFor={id}
        className="text-sm text-gray-600 dark:text-gray-400 navy:text-slate-400"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
        className={INPUT_CLASS}
      />
    </div>
  );
}
