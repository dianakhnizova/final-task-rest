import { useState } from 'react';

import { historyPageMessages as messages } from '@/sources/messages/historyPage.ts';

import { pageMeta } from '@/utils/metaHelpers.ts';

import styles from './history.module.css';

export const meta = pageMeta(messages);

export interface HistoryRecord {
  latencyMs: number;
  status: number;
  timestamp: Date;
  method: string;
  requestSize: number;
  responseSize: number;
  error?: string;
  url: string;
}

export default function HistoryPage() {
  const [data] = useState<HistoryRecord[]>([
    {
      latencyMs: 245,
      status: 200,
      timestamp: new Date('2025-09-14T10:30:00'),
      method: 'GET',
      requestSize: 128,
      responseSize: 1024,
      url: 'https://api.example.com/users',
    },
    {
      latencyMs: 567,
      status: 404,
      timestamp: new Date('2025-09-14T10:29:00'),
      method: 'POST',
      requestSize: 512,
      responseSize: 89,
      error: 'Resource not found',
      url: 'https://api.example.com/invalid',
    },
    {
      latencyMs: 123,
      status: 201,
      timestamp: new Date('2025-09-14T10:28:00'),
      method: 'PUT',
      requestSize: 768,
      responseSize: 256,
      url: 'https://api.example.com/users/1',
    },
    {
      latencyMs: 890,
      status: 500,
      timestamp: new Date('2025-09-14T10:27:00'),
      method: 'DELETE',
      requestSize: 64,
      responseSize: 128,
      error: 'Internal server error',
      url: 'https://api.example.com/posts/5',
    },
    {
      latencyMs: 345,
      status: 200,
      timestamp: new Date('2025-09-14T10:26:00'),
      method: 'PATCH',
      requestSize: 256,
      responseSize: 512,
      url: 'https://api.example.com/comments/3',
    },
  ]);

  return (
    <div>
      <h1 className={styles.header}>{messages.header}</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{messages.table.headers.latency}</th>
            <th>{messages.table.headers.status}</th>
            <th>{messages.table.headers.timestamp}</th>
            <th>{messages.table.headers.method}</th>
            <th>{messages.table.headers.requestSize}</th>
            <th>{messages.table.headers.responseSize}</th>
            <th>{messages.table.headers.error}</th>
            <th>{messages.table.headers.url}</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={8}>{messages.table.emptyMessage}</td>
            </tr>
          )}
          {data.map(record => (
            <tr key={record.timestamp.getTime()}>
              <td>{record.latencyMs}</td>
              <td>{record.status}</td>
              <td>{record.timestamp.toLocaleString()}</td>
              <td>{record.method}</td>
              <td>{record.requestSize}</td>
              <td>{record.responseSize}</td>
              <td>{record.error}</td>
              <td>{record.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
