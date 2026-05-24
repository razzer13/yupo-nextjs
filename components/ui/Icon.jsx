export default function Icon({ name, size = 20, color = 'currentColor', style = {} }) {
  const icons = {
    home:        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>,
    grid:        <><rect x="3" y="3" width="7" height="7" rx="1" fill="none" stroke={color} strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" fill="none" stroke={color} strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" fill="none" stroke={color} strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1" fill="none" stroke={color} strokeWidth="1.8"/></>,
    search:      <><circle cx="11" cy="11" r="8" fill="none" stroke={color} strokeWidth="1.8"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    cart:        <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="1.8"/><path d="M16 10a4 4 0 01-8 0" fill="none" stroke={color} strokeWidth="1.8"/></>,
    user:        <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="7" r="4" fill="none" stroke={color} strokeWidth="1.8"/></>,
    heart:       <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>,
    package:     <><path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/><path d="M2 7l10 5 10-5M12 12v10" fill="none" stroke={color} strokeWidth="1.8"/></>,
    tag:         <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/><line x1="7" y1="7" x2="7.01" y2="7" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></>,
    truck:       <><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/><circle cx="5.5" cy="18.5" r="2.5" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="18.5" cy="18.5" r="2.5" fill="none" stroke={color} strokeWidth="1.8"/></>,
    shield:      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>,
    check:       <polyline points="20 6 9 17 4 12" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>,
    x:           <><line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    chevronRight:<polyline points="9 18 15 12 9 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    chevronLeft: <polyline points="15 18 9 12 15 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    chevronDown: <polyline points="6 9 12 15 18 9" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    plus:        <><line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    minus:       <line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>,
    star:        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={color} stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>,
    starEmpty:   <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>,
    eye:         <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="12" cy="12" r="3" fill="none" stroke={color} strokeWidth="1.8"/></>,
    trash:       <><polyline points="3 6 5 6 21 6" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    edit:        <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/></>,
    mail:        <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke={color} strokeWidth="1.8"/><polyline points="22 6 12 13 2 6" fill="none" stroke={color} strokeWidth="1.8"/></>,
    phone:       <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.27 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>,
    mapPin:      <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="12" cy="10" r="3" fill="none" stroke={color} strokeWidth="1.8"/></>,
    clock:       <><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.8"/><polyline points="12 6 12 12 16 14" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    settings:    <><circle cx="12" cy="12" r="3" fill="none" stroke={color} strokeWidth="1.8"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke={color} strokeWidth="1.8"/></>,
    barChart:    <><line x1="18" y1="20" x2="18" y2="10" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="12" y1="20" x2="12" y2="4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="6" y1="20" x2="6" y2="14" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    shoppingBag: <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="1.8"/><path d="M16 10a4 4 0 01-8 0" fill="none" stroke={color} strokeWidth="1.8"/></>,
    gift:        <><polyline points="20 12 20 22 4 22 4 12" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/><rect x="2" y="7" width="20" height="5" rx="1" fill="none" stroke={color} strokeWidth="1.8"/><line x1="12" y1="22" x2="12" y2="7" stroke={color} strokeWidth="1.8"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/></>,
    lock:        <><rect x="3" y="11" width="18" height="11" rx="2" fill="none" stroke={color} strokeWidth="1.8"/><path d="M7 11V7a5 5 0 0110 0v4" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    percent:     <><line x1="19" y1="5" x2="5" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round"/><circle cx="6.5" cy="6.5" r="2.5" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="17.5" cy="17.5" r="2.5" fill="none" stroke={color} strokeWidth="1.8"/></>,
    refreshCw:   <><polyline points="23 4 23 10 17 10" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><polyline points="1 20 1 14 7 14" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    building:    <><rect x="3" y="3" width="18" height="18" rx="1" fill="none" stroke={color} strokeWidth="1.8"/><path d="M3 9h18M3 15h18M9 3v18" fill="none" stroke={color} strokeWidth="1.8"/></>,
    upload:      <><polyline points="16 16 12 12 8 16" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="12" x2="12" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    download:    <><polyline points="8 17 12 21 16 17" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="12" x2="12" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.11" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    info:        <><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.8"/><line x1="12" y1="16" x2="12" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="12" y1="8" x2="12.01" y2="8" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></>,
    alertCircle: <><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.8"/><line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="12" y1="16" x2="12.01" y2="16" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></>,
    bell:        <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    thumbsUp:    <><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/></>,
    logOut:      <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    zoomIn:      <><circle cx="11" cy="11" r="8" fill="none" stroke={color} strokeWidth="1.8"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="11" y1="8" x2="11" y2="14" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="8" y1="11" x2="14" y2="11" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    sparkles:    <><path d="M12 3v2M12 19v2M3 12H1M23 12h-2M5.6 5.6L4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="1.8"/></>,
    creditCard:  <><rect x="1" y="4" width="22" height="16" rx="2" fill="none" stroke={color} strokeWidth="1.8"/><line x1="1" y1="10" x2="23" y2="10" stroke={color} strokeWidth="1.8"/></>,
    camera:      <><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="13" r="4" fill="none" stroke={color} strokeWidth="1.8"/></>,
    list:        <><line x1="8" y1="6" x2="21" y2="6" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="8" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="8" y1="18" x2="21" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="3" y1="6" x2="3.01" y2="6" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><line x1="3" y1="12" x2="3.01" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><line x1="3" y1="18" x2="3.01" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      style={{ display:'inline-block', verticalAlign:'middle', flexShrink:0, ...style }}>
      {icons[name] || null}
    </svg>
  );
}

export function StarRating({ n = 5, size = 13 }) {
  return (
    <span style={{ display:'inline-flex', gap:1 }}>
      {[1,2,3,4,5].map(i => (
        <Icon key={i} name={i <= n ? 'star' : 'starEmpty'} size={size}
          color={i <= n ? '#f9a825' : '#ddd'}/>
      ))}
    </span>
  );
}
