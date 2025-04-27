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
import { FaPlus } from "react-icons/fa6"

interface BookSubmitConfirmProps {
  handleConfirm: () => void
}

export default function BookSubmitConfirm({ handleConfirm }: BookSubmitConfirmProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        type="button"
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-transform duration-200 hover:scale-110 cursor-pointer hover:rotate-180">
        <FaPlus />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>Estás a punto de agregar este libro a la lista.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={() => handleConfirm()}>Agregar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
