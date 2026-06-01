import { profile } from '@/lib/profile';
import { NowPageContent } from '@/components/now-page-content';

export const metadata = {
  title: `Now | ${profile.name.en}`,
  description: `What ${profile.name.en} is reading, building, learning, and exploring now.`,
};

export default function NowPage() {
  return <NowPageContent />;
}
