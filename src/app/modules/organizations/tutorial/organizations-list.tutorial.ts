import { GuidedTour, Orientation } from '@gobsio/ngx-guided-tour';
import { Organization } from '@shared/models/Organization';
import { User } from '@shared/models/User';

export const ORGANIZATIONS_LIST_TUTORIAL: GuidedTour = {
  tourId: 'tutorial-empresas',
  steps: [
    {
      title: 'Nesta tela, é possível visualizar e gerenciar as empresas cadastradas em sua contabilidade. Aqui você pode:',
      content: ''
    },
    {
      title: '',
      content: `
        <h5>
          1. Visualizar as empresas já criadas;
        </h5>
      `,
      selector: 'table',
      orientation: Orientation.Top,
      highlightPadding: 12
    },
    {
      title: '',
      content: `
        <h5>
          2. Clicar na empresa para vê-la em detalhes;
        </h5>
      `,
      selector: '.mat-row',
      orientation: Orientation.Top,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
        <h5>
          3. Criar uma nova empresa.
        </h5>
      `,
      selector: 'li button',
      orientation: Orientation.Left,
      highlightPadding: 5
    },
    {
      title: 'Defina sua ação e ótimo trabalho!',
      content: ''
    }
  ]
};

export const getFakeOrganization = () => {
  const currentUser = User.fromLocalStorage();
  const organization: any = {
    active: true,
    avatar: null,
    cnpj: currentUser.organization.cnpj,
    codigoERP: '0123',
    email: null,
    externalId: null,
    id: -10,
    name: 'Empresa Demonstrativa',
    organizationId: currentUser.organization.id,
    type: Organization.Type.CUSTOMER
  };
  return organization;
};
