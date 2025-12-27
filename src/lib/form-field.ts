import { useFormContext } from "react-hook-form"
import { createContext, useContext } from "react"

const FormFieldContext = createContext<unknown>(undefined)
const FormItemContext = createContext<unknown>(undefined)

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext) as { name: string }
  const itemContext = useContext(FormItemContext) as { id: string }
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}
