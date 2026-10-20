
export default function ResturanLogo({ className }: { className?: string }) {
  return <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
  <rect x="1" y="1" width="62" height="62" rx="14"   stroke-width="2"
    className="fill-surface-control stroke-border"
  />

  
  <circle cx="23" cy="27" r="3" fill="#ef4444"/>
  <circle cx="32" cy="23" r="3.5" fill="#ef4444"/>
  <circle cx="41" cy="27" r="3" fill="#ef4444"/>
  <circle cx="27.5" cy="26" r="3" fill="#ef4444"/>
  <circle cx="36.5" cy="26" r="3" fill="#ef4444"/>

 
  <rect x="12" y="30" width="40" height="4" rx="2" fill="#ef4444"/>

  
  <path d="M15 35 H49 C49 44 41.5 51 32 51 C22.5 51 15 44 15 35 Z" fill="#ef4444"/>

  
  <rect x="26" y="51" width="12" height="3" rx="1.5" fill="#ef4444"/>
</svg>
}
