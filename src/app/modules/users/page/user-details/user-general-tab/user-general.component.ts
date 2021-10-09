import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
import { ImageCompressionService } from '@app/http/image-compression.service';

// Forms

@Component({
  selector: 'app-user-general',
  templateUrl: './user-general.component.html',
  styleUrls: ['./user-general.component.scss']
})
export class UserGeneralComponent implements OnInit, OnChanges {

  private currentUser: User;

  @Input()
  public user: User = null;

  @Output()
  public userUpdate: EventEmitter<any> = new EventEmitter();

  public editingId: string;
  public allowInfos = false;

  constructor(
    public userService: UserService,
    public fileStorageService: FileStorageService,
    public imageCompressionService: ImageCompressionService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user?.id && this.currentUser.organization.id !== this.user.organization.id) {
      this.router.navigate(['']);
    } else if (this.user?.id) {
      this.allowInfos = true;
    }
  }

  public canEdit() {
    const usersExist = this.currentUser?.id && this.user?.id;
    const isSameAccounting = this.currentUser.organization.id === this.user?.organization?.id;
    const canChange = this.currentUser.id === this.user?.id || this.currentUser.canManage();
    return usersExist && isSameAccounting && canChange;
  }

  openDialog(): void {
    if (!this.canEdit()) {
      return;
    }
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      maxWidth: '568px',
      data: { name: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.croppedImage) {
        this.imageCompressionService.compress(ImageUtils.dataURLtoFile(result.croppedImage, result.croppedName))
          .subscribe((compressed) => {
            this.fileStorageService.store(ImageUtils.blobToFile(compressed, result.croppedName))
              .subscribe((response) => {
                if (response.record && response.record.id) {
                  this.patch(this.user.id, {
                    avatar: this.fileStorageService.getResourceURL(response.record.id)
                  }, true);
                }
              });
          });
      }
    });
  }

  public edit = (id: string = null) => this.editingId = id;
  public isEditing = (id: string) => this.editingId === id;

  public async patch(id: number, data: any, reload: boolean = false): Promise<any> {
    if (!this.canEdit()) {
      return;
    }
    return new Promise<any>((resolve, reject) => {
      this.userService.patch(id, data).pipe(
        finalize(() => {
          resolve(null);
        })
      )
        .pipe(finalize(() => { if (reload) { document.location.reload(); } }))
        .subscribe((response: GenericResponse<User>) => {
          this.user = response.record;
        });
    }).then(() => {
      this.edit();
      this.userUpdate.emit(this.user);
    });
  }

  /**
   * Método para verificar se usuário logado tem permissão para alterar o
   * status do usuário. Apenas usuários do tipo Administrador (0) e Contador (1).
   * @deprecated
   */
  canSwitchStatus(): boolean {
    return this.currentUser.id !== this.user.id
      && [User.Type.ADMINISTRATOR, User.Type.ACCOUNTANT].includes(this.currentUser.type);
  }

  ngOnInit() {
    this.currentUser = User.fromLocalStorage();
  }

}
