import { environment } from '@env';
import { GuidedTour, Orientation } from '@gobsio/ngx-guided-tour';

export const productListTutorial = (isManager: boolean) => {
  const tour: GuidedTour = {
    tourId: 'tutorial-aplicativos',
    steps: [
      {
        title: 'Esta é a tela inicial, aqui você pode:',
        content: ''
      },
      {
        title: '',
        content: `
          <h5>
            1. Acessar os produtos que você possui acesso;
          </h5>
        `,
        selector: '#product-card-0',
        orientation: Orientation.Top,
        highlightPadding: 12
      },
      {
        title: '',
        content: `
          <h5>
            2. Conhecer os demais produtos;
          </h5>
        `,
        selector: '#product-card-1',
        orientation: Orientation.Top,
        highlightPadding: 12
      },
      {
        title: '',
        content: `
          <h5>
            3. Criar, visualizar e alterar usuários;
          </h5>
        `,
        selector: '#sidebar-item-usuarios',
        orientation: Orientation.Right
      },
      {
        title: '',
        content: `
          <h5>
            4. Cadastrar, visualizar e editar empresas${isManager ? ';' : '.'}
          </h5>
        `,
        selector: '#sidebar-item-empresas',
        orientation: Orientation.Right
      }
    ]
  };

  if (isManager) {
    tour.steps.push({
      title: '',
      content: `
        <h5>
          5. Conceder e negar permissões aos usuários.
        </h5>
      `,
      selector: '#sidebar-item-permissoes',
      orientation: Orientation.Right
    });
  }

  tour.steps.push({
    title: 'Defina sua ação é ótimo trabalho!',
    content: ''
  });

  return tour;
};


export const FAKE_PRODUCTS = [
  {
    aboutUrl: window.location.href,
    access: true,
    appUrl: window.location.href,
    description: '',
    group: environment.applicationId,
    id: -2,
    imageUrl: 'https://s3.tareffaapp.com.br:55325/storage/QzpcYnVja2V0c1x0YXJlZmZhLWFwcC1vYXV0aFxPdHRpbWl6emFzaXN0ZW1hc1wyMDIwXDA4XDI2XDVjZGVlNTdiLTI2ZWMtNDc3Yy05OWEyLTk0Y2U0NWI4MGYzZF9fbG9nby1PQkMucG5n',
    name: 'ottimizza.bússola.contábil'
  },
  {
    aboutUrl: window.location.href,
    access: false,
    appUrl: window.location.href,
    description: '',
    group: environment.applicationId,
    id: -1,
    imageUrl: 'https://s3.tareffaapp.com.br:55325/storage/QzpcYnVja2V0c1x0YXJlZmZhLWFwcC1vYXV0aFxPdHRpbWl6emFzaXN0ZW1hc1wyMDIwXDA4XDI2XDVmYTdjOWVhLTYzMmMtNDYyZS05NzRlLTkxYjhmZmEyMjMwN19fbG9nby1PVUQucG5n',
    name: 'ottimizza.última.digitação'
  }
];
