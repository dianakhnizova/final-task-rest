import type { RestClientState } from '@/store/slices/restClient/restClient.slice.ts';
import type { Json } from '@/types/supabase.ts';
import { useNavigate } from 'react-router';
import { AppRoutes } from '@/sources/enums.ts';
import { historyPageMessages as messages } from '@/sources/messages/historyPage.ts';
import { Button } from '@/components/ui/button';
import { useActions } from '@/utils/hooks/useActions.ts';
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
  const { setState } = useActions();
  const navigate = useNavigate();

  function handleOpen(record: HistoryRecord) {
    setState(JSON.parse(record.clientState as string) as RestClientState);
    navigate(AppRoutes.REST_CLIENT);
  }

  return (
    <div>
      <h1 className={styles.header}>{messages.header}</h1>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{messages.table.headers.action}</th>
              <th>{messages.table.headers.timestamp}</th>
              <th>{messages.table.headers.url}</th>
              <th>{messages.table.headers.latency}</th>
              <th>{messages.table.headers.status}</th>
              <th>{messages.table.headers.method}</th>
              <th>{messages.table.headers.requestSize}</th>
              <th>{messages.table.headers.responseSize}</th>
              <th>{messages.table.headers.error}</th>
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
                    <Button onClick={() => handleOpen(record)}>Open</Button>
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
