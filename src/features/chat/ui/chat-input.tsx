import classes from './chat-input.module.css';
import { Button } from '@/shared/ui/button';
import { ChevronUp, Square } from 'lucide-react';
import { useState } from 'react';

interface ChatInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  defaultValue?: string;
  isGenerating?: boolean;
  onSend?: (value: string) => void;
  onStop?: () => void;
}

export function ChatInput({
  isGenerating = false,
  onSend,
  onStop,
  value,
  defaultValue = '',
  onChange,
  ...props
}: ChatInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }

    onChange?.(e);
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSend?.(currentValue);
  };

  return (
    <form className={classes.wrapper} onSubmit={handleSubmit}>
      <input
        className={classes.input}
        value={currentValue}
        onChange={handleChange}
        disabled={isGenerating}
        required
        {...props}
      />

      {isGenerating ? (
        <Button type="button" size="icon" className={classes.button} onClick={onStop}>
          <Square />
        </Button>
      ) : internalValue.trim() !== '' ? (
        <Button type="submit" size="icon" disabled={isGenerating} className={classes.button}>
          <ChevronUp />
        </Button>
      ) : null}
    </form>
  );
}
