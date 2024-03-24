import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import jsesc from 'jsesc';
import moment from 'moment-timezone';
import { Suspense } from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { SWRConfig, unstable_serialize } from 'swr';

import { authorApiClient } from '@wsh-2024/app/src/features/author/apiClient/authorApiClient';
import { bookApiClient } from '@wsh-2024/app/src/features/book/apiClient/bookApiClient';
import { episodeApiClient } from '@wsh-2024/app/src/features/episode/apiClient/episodeApiClient';
import { featureApiClient } from '@wsh-2024/app/src/features/feature/apiClient/featureApiClient';
import { rankingApiClient } from '@wsh-2024/app/src/features/ranking/apiClient/rankingApiClient';
import { releaseApiClient } from '@wsh-2024/app/src/features/release/apiClient/releaseApiClient';
import { ClientApp } from '@wsh-2024/app/src/index';
import { getDayOfWeekStr } from '@wsh-2024/app/src/lib/date/getDayOfWeekStr';

import { INDEX_HTML_PATH } from '../../constants/paths';

const app = new Hono();

async function createInjectDataStr(path: string): Promise<Record<string, unknown>> {
  const json: Record<string, unknown> = {};

  try {
    if (path === '/') {
      const dayOfWeek = getDayOfWeekStr(moment());
      const [releases, features, ranking] = await Promise.all([
        releaseApiClient.fetch({ params: { dayOfWeek } }),
        featureApiClient.fetchList({ query: {} }),
        rankingApiClient.fetchList({ query: {} }),
      ]);
      json[unstable_serialize(releaseApiClient.fetch$$key({ params: { dayOfWeek } }))] = releases;
      json[unstable_serialize(featureApiClient.fetchList$$key({ query: {} }))] = features;
      json[unstable_serialize(rankingApiClient.fetchList$$key({ query: {} }))] = ranking;
    }

    const bookDetail = path.match(/^\/books\/([^/]+)$/);
    if (bookDetail != null) {
      const [book, episodes] = await Promise.all([
        bookApiClient.fetch({ params: { bookId: bookDetail[1]! } }),
        episodeApiClient.fetchList({ query: { bookId: bookDetail[1]! } }),
      ]);
      json[unstable_serialize(bookApiClient.fetch$$key({ params: { bookId: bookDetail[1]! } }))] = book;
      json[unstable_serialize(episodeApiClient.fetchList$$key({ query: { bookId: bookDetail[1]! } }))] = episodes;
    }

    const episodeDetail = path.match(/^\/books\/([^/]+)\/episodes\/([^/]+)$/);
    if (episodeDetail != null) {
      const [episode, episodes] = await Promise.all([
        episodeApiClient.fetch({ params: { episodeId: episodeDetail[2]! } }),
        episodeApiClient.fetchList({ query: { bookId: episodeDetail[1]! } }),
      ]);
      json[unstable_serialize(episodeApiClient.fetch$$key({ params: { episodeId: episodeDetail[2]! } }))] = episode;
      json[unstable_serialize(episodeApiClient.fetchList$$key({ query: { bookId: episodeDetail[1]! } }))] = episodes;
    }

    const authorDetail = path.match(/^\/authors\/([^/]+)$/);
    if (authorDetail != null) {
      const [author, books] = await Promise.all([
        authorApiClient.fetch({ params: { authorId: authorDetail[1]! } }),
        bookApiClient.fetchList({ query: { authorId: authorDetail[1]! } }),
      ]);
      json[unstable_serialize(authorApiClient.fetch$$key({ params: { authorId: authorDetail[1]! } }))] = author;
      json[unstable_serialize(bookApiClient.fetchList$$key({ query: { authorId: authorDetail[1]! } }))] = books;
    }

    if (path === '/search') {
      const bookList = await bookApiClient.fetchList({ query: {} });
      json[unstable_serialize(bookApiClient.fetchList$$key({ query: {} }))] = bookList;
    }

    return json;
  } catch (error) {
    return {};
  }
}

async function createHTML({
  body,
  injectData,
  styleTags,
}: {
  body: string;
  injectData: Record<string, unknown>;
  styleTags: string;
}): Promise<string> {
  const htmlContent = await fs.readFile(INDEX_HTML_PATH, 'utf-8');

  const content = htmlContent
    .replaceAll('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replaceAll('<style id="tag"></style>', styleTags)
    .replaceAll(
      '<script id="inject-data" type="application/json"></script>',
      `<script id="inject-data" type="application/json">
        ${jsesc(injectData, {
          isScriptContext: true,
          json: true,
          minimal: true,
        })}
      </script>`,
    );

  return content;
}

app.get('*', async (c) => {
  const injectData = await createInjectDataStr(c.req.path);
  const sheet = new ServerStyleSheet();

  try {
    const body = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <Suspense fallback={<p>Loading</p>}>
          <SWRConfig value={{ fallback: injectData, revalidateOnFocus: false, revalidateOnReconnect: false }}>
            <StaticRouter location={c.req.path}>
              <ClientApp />
            </StaticRouter>
          </SWRConfig>
        </Suspense>,
      ),
    );

    const styleTags = sheet.getStyleTags();
    const html = await createHTML({ body, injectData, styleTags });

    return c.html(html);
  } catch (cause) {
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    sheet.seal();
  }
});

export { app as ssrApp };
