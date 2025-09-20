import type { HistoryRecord } from '@/routes/privateRoutes/historyPage';
import type { Database } from '@/types/supabase.ts';

export function mapHistoryFromRow(
  historyRow: Database['public']['Tables']['history']['Row']
): HistoryRecord {
  const { latency_ms, timestamp, ...rest } = historyRow;

  return {
    latencyMs: latency_ms,
    timestamp: new Date(timestamp),
    ...rest,
  };
}
