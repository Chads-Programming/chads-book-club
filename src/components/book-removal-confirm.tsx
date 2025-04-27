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
import { TrashIcon } from "lucide-react"

interface BookRemovalConfirmProps {
  handleConfirm: () => void
}

export default function BookRemovalConfirm({ handleConfirm }: BookRemovalConfirmProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer" type="button">
        <TrashIcon color="#d53a3a" size={20} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>Estás a punto de eliminar este libro de la lista.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer"  onClick={() => handleConfirm()}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
