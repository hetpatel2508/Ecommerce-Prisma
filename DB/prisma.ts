import { PrismaClient } from '@prisma/client';
import { SignUpSchema } from '../src/models/users';

const prisma = new PrismaClient({
  log: ['query'],
}).$extends({
  result: {
    address: {
      formattedAddress: {
        // needs: ['lineOne', 'lineTwo', 'city', 'country', 'pincode'],
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          pincode: true,
        },
        compute: (addr) => {
          return `${addr.lineOne}, ${addr.lineTwo===null?'':addr.lineTwo}, ${addr.city}-${addr.pincode}, ${addr.country}`;
        },
      },
    },
  },
});

export default prisma;
