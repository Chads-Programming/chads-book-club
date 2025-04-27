import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

export const paragraphVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-foreground-secondary",
    },
    size: {
      default: "text-[16px]",
      xs: "text-[12px]",
      sm: "text-[13.33px]",
      lg: "text-[23px]",
    },
    width: {
      default: "max-w-none",
      xs: "text-w-xs",
      sm: "text-w-sm",
      md: "text-w-md",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

type ParagraphTag = "p" | "span" | "i" | "label"

type ParagraphProps = {
  as?: ParagraphTag
} & VariantProps<typeof paragraphVariants> &
  React.HTMLAttributes<HTMLElement>
export const Paragraph = ({ as: As = "p", variant, size, width, className, ...props }: ParagraphProps) => {
  return <As className={cn(paragraphVariants({ variant, size, width }), className)} {...props} />
}
