import { historyPageMessages as messages } from '@/sources/messages/historyPage.ts';

import { pageMeta } from '@/utils/metaHelpers.ts';

import styles from './History.module.css';

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

export default function HistoryPage({ data }: { data: HistoryRecord[] }) {
  return (
    <div>
      <h1 className={styles.header}>{messages.header}</h1>
      <div className={styles.container}>
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
    </div>
  );
}
