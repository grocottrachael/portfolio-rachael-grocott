import { BentoGrid } from './BentoGrid';
import profileImage from '../assets/rachael-avatar.webp';

export function Hero() {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 2xl:gap-16 md:items-start max-w-7xl 2xl:max-w-[1600px] mx-auto w-full">
      {/* Left side: Name and intro - 30%, pinned while the bento scrolls */}
      <div className="flex-shrink-0 w-full md:w-[30%] md:sticky md:top-0 md:h-screen md:flex md:flex-col md:justify-center space-y-3 pt-10 md:pt-0">
        <img 
          src={profileImage} 
          alt="Rachael" 
          className="w-10 h-10 rounded-full object-cover mb-4"
          style={{
            border: '2px solid #FF4EA6'
          }}
        />
        
        <div className="space-y-0.5">
        <h1 className="tracking-tight text-[38px] 2xl:text-[40px] whitespace-nowrap font-semibold">
        Hiya, I{'\u2019'}m Rachael!
          </h1>
          
          <p className="text-sm text-neutral-600 text-[17px] 2xl:text-[19px]">
            I'm a Senior Product Designer focused on clear, intuitive, thoughtful design.
            I love shaping complex ideas into simple experiences and giving the UI the polish that makes it feel genuinely beautiful.
          </p>
          <p className="text-neutral-600 text-[17px] 2xl:text-[19px] pt-3">
            I{'\u2019'}m all in on AI and use it to build my own products, start to finish. And I love people: I founded
            Triangirls, speak at events, and rally teams around good ideas.
          </p>
        </div>
      </div>

      {/* Right side: Bento Grid - 70%, scrolls */}
      <div className="flex-shrink-0 w-full md:w-[70%] flex justify-center md:py-24 pb-10">
        <BentoGrid />
      </div>
    </div>
  );
}