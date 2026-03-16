interface InputProps {
  className?: string;
  placeholder?: string;
  ref: React.Ref<HTMLTextAreaElement>;
  value?: string | undefined;
  isTaskInputDisabled?: boolean;
  maxLength?: number;
}

export default function Input({ className, placeholder, ref, value, isTaskInputDisabled = false, maxLength = 200 }: InputProps) {
  return (
    <textarea
      maxLength={maxLength}
      className={`${className} resize-none max-sm:w-full max-sm:text-center sm:h-6`}
      placeholder={placeholder}
      ref={ref}
      value={value}
      readOnly={isTaskInputDisabled}
    />
  );
}
