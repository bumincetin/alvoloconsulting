"use client";

import { useRef, type KeyboardEvent } from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import type { BriefOption } from "@/lib/content/brief";
import { pad2 } from "@/lib/brief/engine";

interface OptionGridProps<T extends string> {
  options: BriefOption<T>[];
  value: T[];
  onChange: (next: T[]) => void;
  /** checkbox semantics; otherwise a radiogroup */
  multi?: boolean;
  /** single-select only: clicking the selected slab clears it (optional questions) */
  allowClear?: boolean;
  labelledBy: string;
  columns?: 2 | 3;
  compact?: boolean;
}

/**
 * Hairline-ruled option slabs: index, title, one helper line, a vermilion rule
 * and a check when selected. ↑/↓ move within the group; the wizard owns
 * Enter / arrows-left-right / number keys.
 */
export default function OptionGrid<T extends string>({ options, value, onChange, multi = false, allowClear = false, labelledBy, columns = 2, compact = false }: OptionGridProps<T>) {
  const ref = useRef<HTMLDivElement>(null);

  const select = (id: T) => {
    if (multi) {
      onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
      return;
    }
    if (value[0] === id) {
      if (allowClear) onChange([]);
      return;
    }
    onChange([id]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Home" && e.key !== "End") return;
    const buttons = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>("button[role]") ?? []);
    if (!buttons.length) return;
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
    let next = current;
    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = buttons.length - 1;
    else if (e.key === "ArrowDown") next = (current + 1) % buttons.length;
    else next = (current - 1 + buttons.length) % buttons.length;
    e.preventDefault();
    buttons[next]?.focus();
    if (!multi) select(options[next].id);
  };

  const firstTab = value.length ? options.findIndex((o) => o.id === value[0]) : 0;

  return (
    <div ref={ref} role={multi ? "group" : "radiogroup"} aria-labelledby={labelledBy} className={clsx("brief-opts", columns === 3 && "brief-opts--3")} onKeyDown={onKeyDown}>
      {options.map((option, i) => {
        const selected = value.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            role={multi ? "checkbox" : "radio"}
            aria-checked={selected}
            tabIndex={multi ? 0 : i === (firstTab < 0 ? 0 : firstTab) ? 0 : -1}
            className={clsx("brief-opt", compact && "brief-opt--compact")}
            onClick={() => select(option.id)}
            data-cursor
          >
            <span className="brief-opt-ix" aria-hidden="true">
              {pad2(i + 1)}
            </span>
            <span>
              <span className="brief-opt-t">{option.title}</span>
              {option.hint ? <span className="brief-opt-h">{option.hint}</span> : null}
            </span>
            <span className="brief-opt-ck" aria-hidden="true">
              <Check strokeWidth={1.75} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
