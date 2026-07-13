import React, { useId } from "react";

type KmsSignatureLogoProps = {
  src?: string;
  className?: string;
  durationSeconds?: number;
  loop?: boolean;
  ariaLabel?: string;
};

export default function KmsSignatureLogo({
  src = "/kms-logo-transparent.png",
  className,
  durationSeconds = 9.8,
  loop = true,
  ariaLabel = "KMS animated signature logo",
}: KmsSignatureLogoProps) {
  const uid = useId().replace(/:/g, "");
  const kMask = `${uid}-mask-k`;
  const mMask = `${uid}-mask-m`;
  const sMask = `${uid}-mask-s`;
  const style = {
    "--kms-cycle": `${durationSeconds}s`,
    "--kms-iterations": loop ? "infinite" : "1",
  } as React.CSSProperties;

  return (
    <svg className={className} style={style} viewBox="0 0 1600 850" role="img" aria-label={ariaLabel} xmlns="http://www.w3.org/2000/svg">
      <style>{`
        .kms-draw { fill:none; stroke:#fff; stroke-linecap:round; stroke-linejoin:round; stroke-dasharray:1 1; stroke-dashoffset:1; animation-duration:var(--kms-cycle); animation-timing-function:linear; animation-iteration-count:var(--kms-iterations); animation-fill-mode:forwards; }
        .kms-k1 { animation-name:kms-k1; } .kms-k2 { animation-name:kms-k2; } .kms-k3 { animation-name:kms-k3; } .kms-k4 { animation-name:kms-k4; } .kms-m { animation-name:kms-m; } .kms-s { animation-name:kms-s; }
        .kms-name,.kms-textiles { opacity:0; animation-duration:var(--kms-cycle); animation-timing-function:ease; animation-iteration-count:var(--kms-iterations); animation-fill-mode:forwards; }
        .kms-name { animation-name:kms-name-in-out; } .kms-textiles { animation-name:kms-textiles-in-out; }
        /* draw the signature part-by-part, then bring in the name + textiles,
           and HOLD the finished logo (no erase, no fade-out) */
        @keyframes kms-k1 { 0%,1%{stroke-dashoffset:1} 12%,100%{stroke-dashoffset:0} }
        @keyframes kms-k2 { 0%,12%{stroke-dashoffset:1} 22%,100%{stroke-dashoffset:0} }
        @keyframes kms-k3 { 0%,22%{stroke-dashoffset:1} 30%,100%{stroke-dashoffset:0} }
        @keyframes kms-k4 { 0%,30%{stroke-dashoffset:1} 42%,100%{stroke-dashoffset:0} }
        @keyframes kms-m { 0%,42%{stroke-dashoffset:1} 52%,100%{stroke-dashoffset:0} }
        @keyframes kms-s { 0%,52%{stroke-dashoffset:1} 62%,100%{stroke-dashoffset:0} }
        @keyframes kms-name-in-out { 0%,62%{opacity:0} 80%,100%{opacity:1} }
        @keyframes kms-textiles-in-out { 0%,74%{opacity:0} 92%,100%{opacity:1} }
        @media (prefers-reduced-motion:reduce) { .kms-draw,.kms-name,.kms-textiles { animation:none!important; } .kms-draw{stroke-dashoffset:0}.kms-name,.kms-textiles{opacity:1;transform:none} }
      `}</style>
      <defs>
        <mask id={kMask}><rect width="100%" height="100%" fill="#000"/><path className="kms-draw kms-k1" pathLength={1} strokeWidth={70} d="M 120 670 C 225 515 360 455 655 410"/><path className="kms-draw kms-k2" pathLength={1} strokeWidth={66} d="M 655 410 C 680 240 716 165 782 183 C 850 202 836 298 770 352 C 733 383 696 399 655 410"/><path className="kms-draw kms-k3" pathLength={1} strokeWidth={62} d="M 655 410 C 713 445 802 395 805 446 C 808 495 730 508 658 469"/><path className="kms-draw kms-k4" pathLength={1} strokeWidth={64} d="M 658 469 C 620 502 550 590 586 607 C 628 627 662 523 674 458 C 724 525 756 590 829 573 C 864 564 887 530 914 491"/></mask>
        <mask id={mMask}><rect width="100%" height="100%" fill="#000"/><path className="kms-draw kms-m" pathLength={1} strokeWidth={64} d="M 910 493 C 946 451 971 407 1002 419 C 1033 432 1008 536 1037 529 C 1077 519 1114 419 1152 424 C 1195 430 1173 499 1223 512 C 1247 518 1263 503 1282 490"/></mask>
        <mask id={sMask}><rect width="100%" height="100%" fill="#000"/><path className="kms-draw kms-s" pathLength={1} strokeWidth={80} d="M 1276 492 C 1323 509 1392 476 1439 432 C 1490 384 1465 345 1417 365 C 1362 388 1364 436 1417 476 C 1467 514 1454 560 1392 566 C 1350 570 1316 560 1300 545"/></mask>
      </defs>
      <g><g mask={`url(#${kMask})`}><image href={src} width={1600} height={850}/></g><g mask={`url(#${mMask})`}><image href={src} width={1600} height={850}/></g><g mask={`url(#${sMask})`}><image href={src} width={1600} height={850}/></g><g className="kms-name"><svg x={890} y={585} width={615} height={47} viewBox="0 0 615 47"><image href={src} x={-890} y={-585} width={1600} height={850}/></svg></g><g className="kms-textiles"><svg x={1282} y={632} width={225} height={44} viewBox="0 0 225 44"><image href={src} x={-1282} y={-632} width={1600} height={850}/></svg></g></g>
    </svg>
  );
}
