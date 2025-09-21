import type { HistoryRecord } from '@/routes/privateRoutes/historyPage';
import type { Database } from '@/types/supabase';
import { describe, expect, it } from 'vitest';
import { HttpMethods } from '@/sources/enums';
import { mapHistoryFromRow } from './historyMapper';

describe('mapHistoryFromRow', () => {
  it('should map history row correctly', () => {
    const mockRow: Database['public']['Tables']['history']['Row'] = {
      id: 1,
      latency_ms: 150,
      timestamp: '2025-09-21T12:00:00.000Z',
      user_id: 'user_123',
      url: '/api/test',
      method: 'GET',
      clientState: {},
      created_at: '2025-09-21T12:00:00.000Z',
      error: null,
      requestSize: null,
      responseSize: null,
      status: 200,
    };

    const result: HistoryRecord = mapHistoryFromRow(mockRow);

    expect(result).toEqual({
      id: 1,
      latencyMs: 150,
      timestamp: new Date('2025-09-21T12:00:00.000Z'),
      user_id: 'user_123',
      url: '/api/test',
      method: HttpMethods.GET,
      clientState: {},
      created_at: '2025-09-21T12:00:00.000Z',
      error: null,
      requestSize: null,
      responseSize: null,
      status: 200,
    });

    expect(result.timestamp instanceof Date).toBe(true);
  });
});
