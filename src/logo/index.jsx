// Logo module — single source of truth for the live logo.
// Drop your logo files into this folder; this barrel wires them to the app.
// The app imports { KmsLogoMark } from './logo' and renders <KmsLogoMark />.
import KmsSignatureLogo from './KmsSignatureLogo';
import logoSrc from './kms-logo-transparent.png';

export function KmsLogoMark(props) {
  return <KmsSignatureLogo src={logoSrc} {...props} />;
}
