import { Hero } from './components/Hero';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen flex flex-col md:justify-center px-6 md:px-12 lg:px-20 2xl:px-32 py-10">
        <Hero />
      </div>
    </div>
  );
}
