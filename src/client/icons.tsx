/**
 * Inline icons matching the dsh ui-primitives icon language. Copied from the
 * official `ic_ds_refresh_outline_16` path so the weather card shares the
 * host's visual identity without importing the primitives package.
 */

/** Refresh (reload) outline icon, 16px, currentColor fill. */
export function RefreshIcon({ size = 16, className }: { size?: number, className?: string | undefined }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.92136 0.349152C10.3744 0.349234 12.5564 1.5052 13.9557 3.29894L15.1281 2.12759C15.3303 1.92546 15.6767 2.06943 15.6767 2.35538V5.53923C15.6766 5.71626 15.5329 5.85976 15.3559 5.86002H12.171C11.8854 5.8597 11.7426 5.51465 11.9443 5.31249L12.9641 4.29056C11.8237 2.74305 9.98908 1.74106 7.92136 1.74097C4.46436 1.74097 1.66233 4.543 1.66233 8C1.66233 11.457 4.46436 14.259 7.92136 14.259C11.3782 14.2589 14.1804 11.4569 14.1804 8H15.5722C15.5722 12.2251 12.1465 15.6507 7.92136 15.6508C3.69614 15.6508 0.270508 12.2252 0.270508 8C0.270508 3.77478 3.69614 0.349152 7.92136 0.349152Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Warning (alert) outline icon, 16px, currentColor fill. */
export function WarningIcon({ size = 16, className }: { size?: number, className?: string | undefined }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 0.25C3.71979 0.25 0.25 3.71979 0.25 8C0.25 12.2802 3.71979 15.75 8 15.75C12.2802 15.75 15.75 12.2802 15.75 8C15.75 3.71979 12.2802 0.25 8 0.25ZM7.25 4.5C7.25 4.08579 7.58579 3.75 8 3.75C8.41421 3.75 8.75 4.08579 8.75 4.5V8.5C8.75 8.91421 8.41421 9.25 8 9.25C7.58579 9.25 7.25 8.91421 7.25 8.5V4.5ZM8 12.25C7.58579 12.25 7.25 11.9142 7.25 11.5C7.25 11.0858 7.58579 10.75 8 10.75C8.41421 10.75 8.75 11.0858 8.75 11.5C8.75 11.9142 8.41421 12.25 8 12.25Z"
        fill="currentColor"
      />
    </svg>
  )
}
