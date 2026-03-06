/**Node modules */
import { VNPay } from 'vnpay'

/**Custom modules */
import { env } from '@/config/env'

export const vnpay = new VNPay({
  tmnCode: env.VNP_TMN_CODE!,
  secureSecret: env.VNP_HASH_SECRET!,
  vnpayHost: 'https://sandbox.vnpayment.vn'
})
