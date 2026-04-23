import type { Ref } from "react";

export function Layout({
  children,
  ref,
  ...props
}: {
  children: React.ReactNode;
  ref: Ref<HTMLDivElement>;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div ref={ref} tabIndex={0} className="grow relative" {...props}>
      {children}
    </div>
  );
}
