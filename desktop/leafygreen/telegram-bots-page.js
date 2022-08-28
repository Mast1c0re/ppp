import { TelegramBotsPage } from '../../shared/telegram-bots-page.js';
import { html } from '../../shared/template.js';
import { ref } from '../../shared/element/templating/ref.js';
import { pageStyles } from './page.js';
import { formatDate } from '../../shared/intl.js';

export const telegramBotsPageTemplate = (context, definition) => html`
  <template>
    <${'ppp-page'}>
      <span slot="header">
        Список ботов Telegram
      </span>
      <${'ppp-button'}
        appearance="primary"
        slot="header-controls"
        @click="${() =>
          ppp.app.navigate({
            page: 'telegram-bot'
          })}"
      >
        Добавить бота
      </ppp-button>
      <${'ppp-table'}
        ${ref('shiftLockContainer')}
        :columns="${() => [
          {
            label: 'Название',
            sortBy: (d) => d.name
          },
          {
            label: 'Дата создания',
            sortBy: (d) => d.createdAt
          },
          {
            label: 'Последнее изменение',
            sortBy: (d) => d.updatedAt
          },
          {
            label: 'Версия',
            sortBy: (d) => d.version
          },
          {
            label: html`
              <div
                style="display: flex; flex-direction: row; gap: 0 6px; align-items: center"
              >
                <span>Действия</span><code class="hotkey">Shift</code>
              </div>
            `
          }
        ]}"
        :rows="${(x) =>
          x.documents.map((datum) => {
            return {
              datum,
              cells: [
                html`<a
                  @click="${() => {
                    ppp.app.navigate({
                      page: 'telegram-bot',
                      document: datum._id
                    });

                    return false;
                  }}"
                  href="?page=telegram-bot&document=${datum._id}"
                  >${datum.name}</a
                >`,
                formatDate(datum.createdAt),
                formatDate(datum.updatedAt ?? datum.createdAt),
                html`
                  <${'ppp-badge'}
                    appearance="green">
                    ${() => datum.version}
                  </ppp-badge>
                `,
                html`
                  <${'ppp-button'}
                    shiftlock
                    disabled
                    class="xsmall"
                    @click="${() => x.removeDocumentFromListing(datum)}"
                  >
                    Удалить
                  </ppp-button>
                `
              ]
            };
          })}"
      >
      </ppp-table>
      <span slot="actions"></span>
  </template>
`;

// noinspection JSUnusedGlobalSymbols
export default TelegramBotsPage.compose({
  template: telegramBotsPageTemplate,
  styles: pageStyles
});
