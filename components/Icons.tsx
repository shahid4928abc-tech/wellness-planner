import type { ReactNode } from "react";

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export const icons = {
  habit: (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.3 2.8 2.8L16.5 9.5" />
    </Svg>
  ),
  goal: (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </Svg>
  ),
  routine: (
    <Svg>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </Svg>
  ),
  mood: (
    <Svg>
      <path d="M12 20.5s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.5 2.5c0 5.6-7.5 10-7.5 10Z" />
    </Svg>
  ),
  chart: (
    <Svg>
      <path d="M4 20V10M10 20V5M16 20v-7M21 20H3" />
    </Svg>
  ),
  leaf: (
    <Svg>
      <path d="M5 19c0-8 5-13 14-14 0 9-5 14-14 14Z" />
      <path d="M5 19c3-4 5-6 8-8" />
    </Svg>
  ),
};
