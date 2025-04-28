import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import type { IconType } from "react-icons/lib"

type BookActionButtonProps = React.ComponentProps<"div"> & {
  icon: IconType | LucideIcon
  iconClassName?: React.ComponentProps<"svg">["className"]
  triggerProps?: React.ComponentProps<"button">
} & (
    | {
        handleConfirm: () => void
        handleTriggered?: never
      }
    | {
        handleTriggered: () => void
        handleConfirm?: never
      }
  )

export const BookActionButton = ({
  handleConfirm,
  handleTriggered,
  icon: Icon,
  iconClassName,
  className,
  triggerProps,
  ...props
}: BookActionButtonProps) => {
  const classNames = cn(
    "absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-transform duration-200 hover:scale-110 cursor-pointer group",
    className,
  )
  const iconClassNames = cn("group-hover:rotate-[360deg] transition-transform", iconClassName)

  if (handleTriggered) {
    return (
      <button type="button" className={classNames} onClick={handleTriggered} {...triggerProps}>
        <Icon className={iconClassNames} />
      </button>
    )
  }

  if (handleConfirm) {
    return (
      <AlertDialog {...props}>
        <AlertDialogTrigger type="button" className={classNames} {...triggerProps}>
          <Icon className={iconClassNames} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>Estás a punto de agregar este libro a la lista.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="cursor-pointer" onClick={() => handleConfirm()}>
              Agregar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
}
