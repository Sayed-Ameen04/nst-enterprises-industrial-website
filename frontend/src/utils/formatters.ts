/**
 * Formatting utilities for products, dimensions, dates and currency
 */

export function formatDimensions(length?: string, width?: string): string {
  if (!length && !width) return 'Custom Available';
  if (length && width) return `${length} × ${width}`;
  return length || width || '';
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  return dateString;
}

export function getStatusBadgeClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'new':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'pending':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'contacted':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'completed':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200';
  }
}
