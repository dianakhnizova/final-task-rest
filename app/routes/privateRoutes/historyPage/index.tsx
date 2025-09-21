import type { Json } from '@/types/supabase.ts';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { AppRoutes } from '@/sources/enums.ts';
import { historyPageMessages as messages } from '@/sources/messages/historyPage.ts';
import { Button } from '@/components/ui/button';
import { pageMeta } from '@/utils/metaHelpers.ts';
import styles from './history.module.css';

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
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>{t('history.header')}</h1>
        <Button onClick={() => navigate(AppRoutes.VARIABLES)}>
          {t('buttons.btnVariables')}
        </Button>
        <Button onClick={() => navigate(AppRoutes.REST_CLIENT)}>
          {t('buttons.btnRestClient')}
        </Button>
      </div>

      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t('history.table.headers.action')}</th>
              <th>{t('history.table.headers.timestamp')}</th>
              <th>{t('history.table.headers.url')}</th>
              <th>{t('history.table.headers.latency')}</th>
              <th>{t('history.table.headers.status')}</th>
              <th>{t('history.table.headers.method')}</th>
              <th>{t('history.table.headers.requestSize')}</th>
              <th>{t('history.table.headers.responseSize')}</th>
              <th>{t('history.table.headers.error')}</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={8}>{t('history.table.emptyMessage')}</td>
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
                      className={styles.link}
                      to={AppRoutes.REST_CLIENT}
                      state={{ history: record }}
                    >
                      {t('history.table.openLink')}
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
