import { BentoGrid } from './BentoGrid';
import profileImage from 'figma:asset/480c09d663e40bc21ee2dec2f07edf81d50784b4.png';

export function Hero() {
  return (
    <div className="h-full flex flex-col md:flex-row gap-8 md:gap-12 2xl:gap-16 items-center max-w-7xl 2xl:max-w-[1600px] mx-auto w-full pb-[125px] md:pb-0 pt-[75px] md:pt-0">
      {/* Left side: Name and intro - 30% */}
      <div className="flex-shrink-0 w-full md:w-[30%] space-y-3">
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
        </div>
      </div>

      {/* Right side: Bento Grid - 70% */}
      <div className="flex-shrink-0 w-full md:w-[70%] flex items-center justify-center">
        <BentoGrid />
      </div>
    </div>
  );
}