import bcrypt from 'bcryptjs'
import { prisma } from '../src/lib/prisma'

async function main() {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash('123456', salt)

  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'System',
      email: 'admin@admin.com',
      phone: '0000000000',
      password,
      role: 'ADMIN'
    }
  })

  await prisma.category.createMany({
    data: [
      { name: 'Phone', slug: 'phone' },
      { name: 'Laptop', slug: 'laptop' },
      { name: 'Tablet', slug: 'tablet' }
    ],
    skipDuplicates: true
  })
}

main()
