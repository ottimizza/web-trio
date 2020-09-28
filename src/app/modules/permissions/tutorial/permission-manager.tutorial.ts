import { GuidedTour, Orientation } from '@gobsio/ngx-guided-tour';
import { Authority } from '@shared/models/TokenInfo';
import { User } from '@shared/models/User';
import { UserProductAuthorities } from '@shared/models/UserProductAuthorities';

export const PERMISSION_MANAGER_TUTORIAL: GuidedTour = {
  tourId: 'tutorial-permissoes',
  steps: [
    {
      title: 'Nesta tela, é possível gerenciar as permissões dos usuários. Da seguinte forma:',
      content: ''
    },
    {
      title: '',
      content: `
        <h5>
          1. Escolha quais produtos o usuário tem acesso;
        </h5>
      `,
      selector: '.mat-form-field-wrapper',
      orientation: Orientation.Top,
      highlightPadding: 12
    },
    {
      title: '',
      content: `
        <h5>
          2. Informe se o usuário terá permissão para ver;
        </h5>
      `,
      selector: '.read-checkbox',
      orientation: Orientation.Top,
      highlightPadding: 12
    },
    {
      title: '',
      content: `
        <h5>
          3. Informe se o usuário terá permissão para editar;
        </h5>
      `,
      selector: '.write-checkbox',
      orientation: Orientation.Top,
      highlightPadding: 12
    },
    {
      title: '',
      content: `
        <h5>
          4. Informe se o usuário terá permissão para gerenciar.
        </h5>
      `,
      selector: '.manage-checkbox',
      orientation: Orientation.Left,
      highlightPadding: 12
    },
    {
      title: '',
      content: `
        <h5>
          5. Concede permissões a todos os usuários afetados pelo filtro atual.
        </h5>
      `,
      selector: 'li button',
      orientation: Orientation.Left,
      highlightPadding: 5
    },
    {
      title: 'Defina sua ação e ótimo trabalho!',
      content: ''
    },
  ]
};

export const getFakeUserProductAuthority = (): UserProductAuthorities => {
  const currentUser = User.fromLocalStorage();
  const upa = new UserProductAuthorities();
  upa.authorities = [{ name: Authority.READ }, { name: Authority.WRITE }];
  upa.avatar = null;
  upa.firstName = 'Usuário';
  upa.lastName = 'Demonstrativo';
  upa.id = -10;
  upa.products = [];
  upa.email = currentUser.email || currentUser.username;
  return upa;
};
