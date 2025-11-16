"use client";
import React, { useEffect, useMemo, useState } from "react";
import DirectionHoverButton from "./DirectionAwareButton";

export type OptionValue = string | number;

export interface Option<T extends OptionValue = OptionValue> {
  value: T;
  label: React.ReactNode;
  disabled?: boolean;
  id?: string;
}

export interface SelectProps<T extends OptionValue = OptionValue> {
  items: Option<T>[];
  value?: T | T[] | null;
  defaultValue?: T | T[] | null;
  onChange?: (
    value: T | T[] | null,
    option: Option<T> | Option<T>[] | null
  ) => void;
  className?: string;
  buttonClassName?: string;
  renderOption?: (option: Option<T>, selected: boolean) => React.ReactNode;
  multiple?: boolean;
  allowDeselect?: boolean;
  bubbleClassName?: string;
  clickedBubbleClassName?: string;
}

export default function Select<T extends OptionValue = OptionValue>({
  items,
  value: controlledValue,
  defaultValue = null,
  onChange,
  className = "",
  buttonClassName = "",
  renderOption,
  multiple = false,
  allowDeselect = false,
  bubbleClassName = "bg-accent",
  clickedBubbleClassName = "bg-white",
}: SelectProps<T>) {
  const isControlled = controlledValue !== undefined;

  const [internalValue, setInternalValue] = useState<T | T[] | null>(() => {
    if (defaultValue == null) return multiple ? ([] as T[]) : null;
    return defaultValue;
  });

  useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue ?? (multiple ? ([] as T[]) : null));
    }
  }, [controlledValue, isControlled, multiple]);

  const selectedValue: T | T[] | null = isControlled
    ? controlledValue ?? (multiple ? ([] as T[]) : null)
    : internalValue;

  const normalizedItems = useMemo(() => items ?? ([] as Option<T>[]), [items]);

  const isOptionSelected = (opt: Option<T>) => {
    if (multiple) {
      if (!Array.isArray(selectedValue)) return false;
      return selectedValue.includes(opt.value);
    } else {
      return selectedValue !== null && (selectedValue as T) === opt.value;
    }
  };

  function handleSelect(option: Option<T>) {
    if (option.disabled) return;

    if (multiple) {
      const current = (selectedValue as T[]) ?? [];
      const already = current.includes(option.value);
      let next: T[];
      if (already) {
        next = current.filter((v) => v !== option.value);
      } else {
        next = [...current, option.value];
      }

      if (!isControlled) {
        setInternalValue(next);
      }

      onChange?.(
        next,
        normalizedItems.filter((i) => next.includes(i.value))
      );
    } else {
      const current = selectedValue as T | null;
      const isSame = current !== null && current === option.value;
      const newValue = isSame && allowDeselect ? null : option.value;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(newValue, newValue === null ? null : option);
    }
  }

  return (
    <div
      role="listbox"
      aria-activedescendant={(() => {
        if (multiple) return undefined;
        const sel = selectedValue as T | null;
        return sel == null ? undefined : `sel-option-${String(sel)}`;
      })()}
      aria-multiselectable={multiple ? true : undefined}
      className={`flex gap-3 flex-wrap ${className}`}
    >
      {normalizedItems.map((opt) => {
        const selected = isOptionSelected(opt);

        const baseUnselected = "bg-transparent";
        const baseSelected =
          "bg-black text-white dark:bg-white dark:text-black";

        const composedBtnClass = `${buttonClassName} ${
          selected ? baseSelected : baseUnselected
        } ${opt.disabled ? "opacity-50 cursor-not-allowed" : ""}`;

        return (
          <div
            key={opt.id ?? String(opt.value)}
            role="option"
            aria-selected={selected}
            id={`sel-option-${String(opt.value)}`}
          >
            <DirectionHoverButton
              onClick={() => handleSelect(opt)}
              className={composedBtnClass}
              disabled={opt.disabled}
              bubbleClassName={bubbleClassName}
              clickedBubbleClassName={clickedBubbleClassName}
              selected={selected}
            >
              {renderOption ? renderOption(opt, selected) : opt.label}
            </DirectionHoverButton>
          </div>
        );
      })}
    </div>
  );
}
