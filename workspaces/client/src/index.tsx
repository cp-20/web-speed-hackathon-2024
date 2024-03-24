import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { ClientApp } from '@wsh-2024/app/src/index';

import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  registerServiceWorker();

  document.addEventListener('DOMContentLoaded', () => {
    const fallback = JSON.parse(document.getElementById('inject-data')?.textContent ?? '{}');
    ReactDOM.hydrateRoot(
      document.getElementById('root')!,
      <Suspense fallback={<p>Loading</p>}>
        <SWRConfig value={{ fallback, revalidateOnFocus: false, revalidateOnReconnect: false }}>
          <BrowserRouter>
            <ClientApp />
          </BrowserRouter>
        </SWRConfig>
      </Suspense>,
    );
  });
};

main().catch(console.error);
