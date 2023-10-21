import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(404).json({ message: 'userId is missing.' });
  }

  if (req.method === 'PUT') {
    const userData = req.body;

    try {
      const updateUser = await prisma.user.update({
        where: {
          id: userId as string,
        },
        data: userData,
      });

      if (!updateUser) {
        return res.status(404).json({ message: 'User was not found' });
      }

      return res.status(200).json({ message: 'Successfully updated' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Something went wrong.', error: error.message });
    }
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} method is not allowed.` });
  }
}
