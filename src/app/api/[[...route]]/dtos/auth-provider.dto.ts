import { Provider } from "@prisma/client"
import { z } from "zod"

export const authProviderSchemaDto = z.object({
  provider: z.nativeEnum(Provider),
})
