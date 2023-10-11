import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Clips = async () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push('/api/auth/signin');
  }

  return (
    <div>
      <h1>Clips</h1>
      <div>Watched</div>
      <div>Not Watched yet</div>
    </div>
  );
};

export default Clips;
