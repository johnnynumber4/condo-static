/**
 * One place that knows how to build a maps link, so every "Get directions"
 * button on the site behaves the same way.
 *
 * `dir` rather than `search`: it drops the guest straight into navigation
 * from wherever they are, which is what they want from the condo or a
 * restaurant car park. A destination can be a street address or a
 * "latitude,longitude" pair; both are accepted verbatim.
 */
export function directionsUrl(destination: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    destination
  )}`;
}
