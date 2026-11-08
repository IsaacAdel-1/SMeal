import * as React from "react"
import { cn } from "@/lib/utils"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { ChevronDownIcon } from "lucide-react"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  headerClassName,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  headerClassName?: string
}) {
  return (
    <AccordionPrimitive.Header className={cn("flex", headerClassName)}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex w-full items-start rounded-2xl border border-transparent text-start text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          aria-hidden="true"
          className="pointer-events-none absolute end-4 top-6 size-6 shrink-0 text-muted-foreground transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
