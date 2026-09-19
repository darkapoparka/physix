"use client";
// Extracted from Fidelity primitives; no reference data/auth dependencies.
import {useEffect,useRef,useId,type ReactNode} from "react";
import Link from "next/link";
import {ChevronLeft,ChevronRight,X} from "lucide-react";
export function IconButton({
  label,
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className={"icon-button " + className}
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export function Back({
  href = "/",
  label = "Back",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Link className="icon-button" href={href} aria-label={label}>
      <ChevronLeft size={23} />
    </Link>
  );
}
export function PageHead({
  title,
  back,
  children,
}: {
  title: string;
  back?: string;
  children?: ReactNode;
}) {
  return (
    <header className={"page-head " + (back ? "with-back" : "")}>
      {back && <Back href={back} />}
      <h1>{title}</h1>
      {children && <div className="head-actions">{children}</div>}
    </header>
  );
}
export function Row({
  children,
  detail,
  onClick,
  href,
  icon,
}: {
  children: ReactNode;
  detail?: string;
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
}) {
  const content = (
    <>
      {icon && <span className="row-icon">{icon}</span>}
      <span className="row-copy">
        <span>{children}</span>
        {detail && <small>{detail}</small>}
      </span>
      <ChevronRight size={20} />
    </>
  );
  return href ? (
    <Link className="row" href={href} onClick={onClick}>
      {content}
    </Link>
  ) : (
    <button type="button" className="row" onClick={onClick}>
      {content}
    </button>
  );
}
export function Sheet({
  title,
  children,
  onClose,
  className = "",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    dialog?.showModal();
    dialog?.focus({preventScroll:true});
    return () => {
      dialog?.close();
      queueMicrotask(() => {
        if (trigger?.isConnected) trigger.focus();
      });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      tabIndex={-1}
      className={"sheet " + className}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby={titleId}
    >
      <div className="sheet-inner">
        <header>
          <IconButton label="Close" onClick={onClose}>
            <X />
          </IconButton>
          <h2 id={titleId}>{title}</h2>
        </header>
        <div className="sheet-content">{children}</div>
      </div>
    </dialog>
  );
}
export function Tabs({
  items,
  value,
  onChange,
}: {
  items: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="tabs" role="group">
      {items.map((item) => (
        <button
          type="button"
          key={item}
          aria-pressed={value === item}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
