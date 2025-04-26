import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingTag
}

export const headingVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "text-foreground",
      primary: "text-foreground-primary",
      secondary: "text-foreground-secondary",
    },
    size: {
      default: "text-[28px]",
      xs: "text-[16px]",
      sm: "text-[24px]",
      md: "text-[34px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export const Heading = ({ as: As = "h2", className, children, variant, size, ...props }: HeadingProps) => {
  return (
    <As className={cn(headingVariants({ variant, size }), className)} {...props}>
      {children}
    </As>
  )
}
