import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { UserService } from '@app/http/users.service';
import { User } from '@shared/models/User';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AvatarDialogComponent } from '@modules/users/dialogs/avatar-dialog/avatar-dialog.component';
import { FileStorageService } from '@app/http/file-storage.service';
import { ImageUtils } from '@shared/utils/image.utils';
import { ImageCompressorService } from '@app/services/image-compression.service';

// Forms
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.scss']
})
export class UserSecurityComponent implements OnInit, AfterViewInit {

  private currentUser: User;

  @Input()
  public user: User = null;

  @Output()
  userUpdate: EventEmitter<any> = new EventEmitter();

  public changePasswordForm: FormGroup;

  showPassword: boolean;

  constructor(private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder,
    public router: Router,
    public userService: UserService,
    public fileStorageService: FileStorageService,
    public imageCompressorService: ImageCompressorService,
    public dialog: MatDialog) {
  }

  submit() {
    if (this.changePasswordForm.valid) {
      this.changePassword();
    }
    // aqui você pode implementar a logica para fazer seu formulário salvar
    console.log(this.changePasswordForm.value);

    // Usar o método reset para limpar os controles na tela
    this.changePasswordForm.reset();
  }

  public async changePassword() {
    const id = this.user.id;
    const data = { password: this.f.oldPassword.value, newPassword: this.f.newPassword.value };
    return this.patch(id, data).then((response) => {
      this.userUpdate.emit(this.user);
    });
  }

  private async patch(id: number, data: any): Promise<void> {
    return new Promise<any>((resolve, reject) => {
      this.userService.patch(id, data)
        .pipe(finalize(() => resolve()))
        .subscribe((response: GenericResponse<User>) => {
          this.user = response.record;
        });
    });
  }


  get f() { return this.changePasswordForm.controls; }

  public createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [
        '',
        [Validators.required]
      ],
      newPassword: [
        '',
        [Validators.required,
        Validators.minLength(6)]
      ],
    });
  }

  ngOnInit() {
    this.createChangePasswordForm();

    this.currentUser = User.fromLocalStorage();
    this.user = this.user === null ? User.fromLocalStorage() : this.user;


  }

  ngAfterViewInit() {
    // alert('ngAfterViewInit');
  }

}
