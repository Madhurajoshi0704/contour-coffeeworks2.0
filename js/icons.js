/* ==========================================================================
   Contour Coffeeworks — line-art instrument icons
   Simple stroke illustrations, no external image assets required.
   ========================================================================== */

const ICONS = {
  dripper: `
   <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 34H88L66 88C63 95 57 95 54 88L32 34Z" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M40 34C40 34 46 20 60 20C74 20 80 34 80 34" stroke="var(--brass)" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="24" y1="34" x2="96" y2="34" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="60" cy="100" rx="26" ry="6" stroke="var(--ink)" stroke-width="1.5" opacity="0.4"/>
    </svg>`,

  kettle: `
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M34 46C34 36 45 28 60 28C75 28 86 36 86 46V84C86 92 78 98 60 98C42 98 34 92 34 84V46Z" stroke="var(--ink)" stroke-width="2.5"/>
      <path d="M86 50C98 48 104 40 100 30C97 23 90 22 86 26" stroke="var(--brass)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M40 34C46 22 74 22 80 34" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="60" cy="24" r="3" fill="var(--brass)"/>
      <line x1="34" y1="60" x2="86" y2="60" stroke="var(--ink)" stroke-width="1.2" opacity="0.35"/>
    </svg>`,

  grinder: `
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="38" y="26" width="44" height="50" rx="3" stroke="var(--ink)" stroke-width="2.5"/>
      <path d="M44 76L48 96H72L76 76" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="60" cy="18" r="7" stroke="var(--brass)" stroke-width="2.5"/>
      <line x1="60" y1="11" x2="60" y2="4" stroke="var(--brass)" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="46" y1="42" x2="74" y2="42" stroke="var(--ink)" stroke-width="1.2" opacity="0.35"/>
      <line x1="46" y1="54" x2="74" y2="54" stroke="var(--ink)" stroke-width="1.2" opacity="0.35"/>
    </svg>`,

  cups: `
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 50H50L47 72C46.5 76 43 78 39 78H37C33 78 29.5 76 29 72L26 50Z" stroke="var(--ink)" stroke-width="2"/>
      <path d="M70 50H94L91 72C90.5 76 87 78 83 78H81C77 78 73.5 76 73 72L70 50Z" stroke="var(--ink)" stroke-width="2"/>
      <path d="M48 34H72L69 56C68.5 60 65 62 61 62H59C55 62 51.5 60 51 56L48 34Z" stroke="var(--brass)" stroke-width="2"/>
    </svg>`,

  filters: `
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 30H90L64 96C62 100 58 100 56 96L30 30Z" stroke="var(--ink)" stroke-width="2" opacity="0.5"/>
      <path d="M36 26H84L60 90C58.5 93.5 55.5 93.5 54 90L36 26Z" stroke="var(--ink)" stroke-width="2" opacity="0.75"/>
      <path d="M42 22H78L60 84C58.7 87.3 55.3 87.3 54 84L42 22Z" stroke="var(--brass)" stroke-width="2.5"/>
    </svg>`,

  markC: `
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 15C24 12 21 10.5 18 10.5C12.5 10.5 8 14.9 8 20.3C8 25.7 12.5 30.1 18 30.1C21.2 30.1 24 28.5 26 25.9" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>
    </svg>`
};

function renderIcon(name){
  return ICONS[name] || "";
}
