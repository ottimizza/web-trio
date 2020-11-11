import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
//
// models
import { Organization } from '@shared/models/Organization';
import { User } from '@shared/models/User';
import { environment } from '@env';
import { InvitationService } from '@app/http/invites.service';
import { SignUpService } from '@app/http/signup.service';
import { ToastService } from '@app/services/toast.service';
import { AuthenticationService } from '@app/authentication/authentication.service';

export class InvitationDetails {

  static TYPE_ADMINISTRATOR = 0;
  static TYPE_ACCOUNTANT = 1;
  static TYPE_CUSTOMER = 2;

  constructor(
    public id: number = null,
    public token: string = '',
    public email: string = '',
    public type: number = InvitationDetails.TYPE_ACCOUNTANT,
    public organization: Organization = new Organization(),
    public userDetails: User = new User(),
    public authorities: Array<string> = new Array<string>(),
    public products: Array<string> = new Array<string>()
  ) { }

}

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public alertMessage = '';
  public primaryColor = `${environment.backgroundTheme}`;

  /**
   * Invitation token created by an invitation
   * from an accountant or by marketing register screen.
   *
   */
  private invitationToken: string;
  public invitationDetails: InvitationDetails = new InvitationDetails();

  public user: User = new User();
  public organization: Organization = new Organization();

  public password: string;
  public passwordCheck: string;

  constructor(
    private route: ActivatedRoute,
    private invitationService: InvitationService,
    private signupService: SignUpService,
    private toast: ToastService,
    private auth: AuthenticationService
  ) { }

  signup(): void {
    console.log(this.user);
    console.log(this.organization);
    console.log(this.password);
    console.log(this.passwordCheck);
  }

  /**
   * Método resposável por buscar detalhes do convite baseado em um token de convite.
   *
   * @param invitationToken | Token do convite gerado.
   */
  fetchInvitationInfo(invitationToken: string): Promise<InvitationDetails> {
    return new Promise<InvitationDetails>((resolve, reject) => {
      this.invitationService.fetchInvitationByToken(invitationToken).subscribe((response) => {
        this.invitationDetails = response.record;

        this.user = new User();
        this.user.email = this.invitationDetails.email;
        this.user.firstName = this.invitationDetails?.userDetails?.firstName || '';
        this.user.lastName = this.invitationDetails?.userDetails?.lastName || '';
        this.user.phone = this.invitationDetails?.userDetails?.phone || '';

        this.organization = new Organization();
        this.organization = this.invitationDetails.organization;
      });
    });
  }

  @HostListener('keyup.enter')
  register(invitationToken: string = this.invitationToken) {
    this.validateRegister(this.user, this.organization, invitationToken)
      .then((validRegister: boolean) => {
        if (validRegister) {
          const organization = this.organization;
          delete organization.createdAt;
          delete organization.updatedAt;
          console.log(this.user, organization, invitationToken);
          this.signupService.register(this.user, this.organization, invitationToken)
            .subscribe(async (response) => {
              this.toast.show('Cadastro realizado com sucesso, você será redirecionado para o login em 10 segundos', 'success');
              await new Promise(resolve => setTimeout(resolve, 10000));
              this.auth.clearStorage();
              this.auth.authorize();
            });
        }
      });
  }

  private async validateRegister(user: User, organization: Organization, invitationToken: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (!user.email) {
        throw new Error('Informe um endereço de e-mail válido!');
      }
      if (!user.firstName) {
        throw new Error('O campo nome é obrigatório!');
      }
      if (!user.lastName) {
        throw new Error('O campo sobrenome é obrigatório!');
      }
      if (!user.phone) {
        throw new Error('Informe um número de telefone válido!');
      }
      if (!organization.cnpj) {
        throw new Error('Informe o cnpj da contábilidade!');
      }
      if (!organization.name) {
        throw new Error('Informe o nome da contabilidade!');
      }
      //
      if (!this.password) {
        throw new Error('O campo senha é obrigatório!');
      }
      if (!this.passwordCheck || this.password !== this.passwordCheck) {
        throw new Error('As senhas não coincidem!');
      }

      this.user.password = this.password;

      resolve(true);
    }).catch((error: Error) => {
      this.alertMessage = error.message;
      //
      return false;
    });
  }

  /**
   * Called after the constructor, initializing input properties,
   * and the first call to ngOnChanges.
   *
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.invitationToken = params.invitation_token;
      if (this.invitationToken) {
        this.fetchInvitationInfo(this.invitationToken)
          .then((invitationDetails: InvitationDetails) => {
            this.invitationDetails = invitationDetails;

            this.organization = this.invitationDetails.organization;
            this.user = this.invitationDetails.userDetails;
          });
      }
    });
  }

}
