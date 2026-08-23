import { notFound, redirect } from 'next/navigation';
import { bookingChannels, findChannel, taggedUrl } from '../../lib/booking';
import { isFeatureVisible } from '../../lib/visibility';

export function generateStaticParams() {
  return bookingChannels.map((c) => ({ channel: c.id }));
}

/**
 * One outbound door for every booking button, so clicks can be tagged per
 * channel and per campaign without editing any page.
 */
export default async function GoPage({
  params,
  searchParams,
}: {
  params: Promise<{ channel: string }>;
  searchParams: Promise<{ c?: string }>;
}) {
  const { channel: id } = await params;
  const { c: campaign } = await searchParams;

  const channel = findChannel(id);
  // A switched-off or URL-less channel must not be reachable by guessing the
  // link either, not just hidden from the buttons.
  if (!channel || !isFeatureVisible(`channel-${channel.id}`)) notFound();

  const target = taggedUrl(channel, campaign);
  if (!target) notFound();

  redirect(target);
}
