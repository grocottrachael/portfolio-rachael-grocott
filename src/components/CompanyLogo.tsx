/* A company's logo in a little rounded square with the ink stroke, like the rest of the site */
const logos: Record<string, string> = {
  Graphy: '/logos/graphy.png',
  Trint: '/logos/trint.png',
  Geckoboard: '/logos/geckoboard.png',
};

export default function CompanyLogo({ company, className = 'w-[52px] h-[52px]' }: { company: string; className?: string }) {
  return (
    <span className={`shrink-0 grid place-items-center rounded-xl border-2 border-[var(--ink)] bg-white overflow-hidden ${className}`}>
      {logos[company] ? (
        <img
          src={logos[company]}
          alt=""
          className={
            company === 'Graphy'
              ? 'w-full h-full object-contain p-2'
              : /* Trint's logo is a circle, so it's zoomed until it fills the square */
                `w-full h-full object-cover ${company === 'Trint' ? 'scale-[1.42]' : ''}`
          }
        />
      ) : (
        /* No logo: the first letter, on a colour */
        <span className="w-full h-full grid place-items-center font-display text-[20px] bg-[var(--c-yellow)]">{company[0]}</span>
      )}
    </span>
  );
}
