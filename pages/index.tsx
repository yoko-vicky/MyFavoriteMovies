import { Hero } from '@/components/home/Hero';
import { HomeMovies } from '@/components/home/HomeMovies';
import { OgHead } from '@/components/layout/OgHead';

export default function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <OgHead />
      <Hero />
      <HomeMovies />
    </div>
  );
}
