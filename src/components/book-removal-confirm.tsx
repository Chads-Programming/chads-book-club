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
import { TrashIcon } from "lucide-react"
import { Button } from "./ui"

interface BookRemovalConfirmProps extends React.ComponentProps<typeof AlertDialogTrigger> {
  handleConfirm: () => void
}

export default function BookRemovalConfirm({ handleConfirm, className, ...props }: BookRemovalConfirmProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={cn("cursor-pointer", className)} {...props}>
        <Button variant="destructive">
          <TrashIcon color="#fff" size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>Estás a punto de eliminar este libro de la lista.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={() => handleConfirm()}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
