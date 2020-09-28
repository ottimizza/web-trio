import { GuidedTour, Orientation } from '@gobsio/ngx-guided-tour';

export const USERLIST_TOUR: GuidedTour = {
  tourId: 'tutorial-usuarios-cadastrados',
  steps: [
    {
      title: `Nesta tela você pode visualizar e gerenciar os usuários cadastrados`,
      content: ''
    },
    {
      title: '',
      content: `
        <h5>
          1. Ver usuários cadastratados;
        </h5>
      `,
      selector: 'table',
      orientation: Orientation.Top,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
        <h5>
          2. Criar novos usuários;
        </h5>
      `,
      selector: '.action-button',
      orientation: Orientation.Left,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
        <h5>
          3. Verificar convites ativos.
        </h5>
      `,
      selector: '#invited-users-tab',
      orientation: Orientation.Bottom,
      highlightPadding: 5
    }
  ]
};
