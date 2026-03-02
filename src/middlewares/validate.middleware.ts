/**Node modules */
import * as z from 'zod'

/**Types */
import type { Request, Response, NextFunction } from 'express'

export const validate =
  <T extends z.ZodTypeAny>(
    schema: T,
    key: 'body' | 'params' | 'query' = 'body'
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[key])

    if (!result.success) {
      return res.status(400).json({
        message: 'Validation Failed',
        errors: z.flattenError(result.error).fieldErrors
      })
    }

    if (key === 'query') {
      req.validatedQuery = result.data
    } else {
      req[key] = result.data
    }

    next()
  }
