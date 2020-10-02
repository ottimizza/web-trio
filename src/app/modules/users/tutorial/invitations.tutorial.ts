import { GuidedTour, Orientation } from '@gobsio/ngx-guided-tour';
import { User } from '@shared/models/User';

export const INVITATION_TUTORIAL: GuidedTour = {
  tourId: 'tutorial-usuarios-convidados',
  steps: [
    {
      title: 'Aqui você pode ver os usuários convidados',
      content: ''
    },
    {
      title: '',
      content: `
        <h5>
          1. Copiar o endereço do convite para enviá-lo;
        </h5>
      `,
      selector: '.jello',
      orientation: Orientation.Left,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
        <h5>
          2. Acessar o convite diretamente.
        </h5>
      `,
      selector: '.external-link',
      orientation: Orientation.Left,
      highlightPadding: 5
    },
    {
      title: 'Defina sua ação e ótimo trabalho!',
      content: ''
    }
  ]
};

export const fakeInvite = () => {
  return {
    authorities: null,
    email: 'email@provedor.com.br',
    id: -10,
    products: null,
    token: 'token-falso',
    type: 1,
    userDetails: null,
    organization: {
      id: -5,
      name: User.fromLocalStorage().organization.name
    }
  };
};
