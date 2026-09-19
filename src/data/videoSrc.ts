export type ResolvedVideo =
  | { kind: 'empty' }
  | { kind: 'file'; src: string }
  | { kind: 'embed'; src: string };

const DRIVE_FILE = /drive\.google\.com\/file\/d\/([^/?#]+)/i;
const DRIVE_QUERY_ID = /drive\.google\.com\/(?:open|uc|file)\b[^#]*[?&]id=([^&#]+)/i;

function driveEmbed(id: string): ResolvedVideo {
  return { kind: 'embed', src: `https://drive.google.com/file/d/${id}/preview` };
}

export function resolveVideo(src: string): ResolvedVideo {
  const trimmed = src.trim();
  if (!trimmed) {
    return { kind: 'empty' };
  }

  const fileMatch = DRIVE_FILE.exec(trimmed);
  if (fileMatch) {
    return driveEmbed(fileMatch[1]);
  }

  const queryMatch = DRIVE_QUERY_ID.exec(trimmed);
  if (queryMatch) {
    return driveEmbed(queryMatch[1]);
  }

  return { kind: 'file', src: trimmed };
}
