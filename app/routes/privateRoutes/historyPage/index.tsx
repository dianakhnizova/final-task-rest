import type { Json } from '@/types/supabase.ts';
import { Link } from 'react-router';
import { AppRoutes } from '@/sources/enums.ts';
import { historyPageMessages as messages } from '@/sources/messages/historyPage.ts';
import { pageMeta } from '@/utils/metaHelpers.ts';
import styles from './History.module.css';

export const meta = pageMeta(messages);

export interface HistoryRecord {
  latencyMs: number | null;
  status: number | null;
  timestamp: Date;
  method: string;
  requestSize: number | null;
  responseSize: number | null;
  error: string | null;
  url: string;
  clientState: Json;
}

export default function HistoryPage({ data }: { data: HistoryRecord[] }) {
  const headerMessages = messages.table.headers;

  return (
    <div>
      <h1 className={styles.header}>{messages.header}</h1>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{headerMessages.action}</th>
              <th>{headerMessages.timestamp}</th>
              <th>{headerMessages.url}</th>
              <th>{headerMessages.latency}</th>
              <th>{headerMessages.status}</th>
              <th>{headerMessages.method}</th>
              <th>{headerMessages.requestSize}</th>
              <th>{headerMessages.responseSize}</th>
              <th>{headerMessages.error}</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={8}>{messages.table.emptyMessage}</td>
              </tr>
            )}
            {data
              .sort((a, b) => {
                return b.timestamp.getTime() - a.timestamp.getTime();
              })
              .map(record => (
                <tr key={record.timestamp.getTime()}>
                  <td>
                    <Link
                      to={AppRoutes.REST_CLIENT}
                      state={{ history: record }}
                    >
                      Open
                    </Link>
                  </td>
                  <td>{record.timestamp.toLocaleString()}</td>
                  <td>{record.url}</td>
                  <td>{record.latencyMs}</td>
                  <td>{record.status}</td>
                  <td>{record.method}</td>
                  <td>{record.requestSize}</td>
                  <td>{record.responseSize}</td>
                  <td>{record.error}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
