import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Clips = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div>
      <h1>Clips</h1>
      <div>Watched</div>
      <div>Not Watched yet</div>
    </div>
  );
};

export default Clips;
