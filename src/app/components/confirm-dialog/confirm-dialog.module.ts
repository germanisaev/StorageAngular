import { NgModule } from '@angular/core';  
import { BrowserModule } from '@angular/platform-browser';  
import { CommonModule } from '@angular/common';  
  
import { ConfirmDialogComponent } from './confirm-dialog.component';  
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 
  
@NgModule({  
    declarations: [  
        ConfirmDialogComponent  
    ],  
    imports: [  
        BrowserModule,  
        CommonModule,
        NgbModule  
    ],  
    exports: [  
        ConfirmDialogComponent  
    ],  
    providers: [  
        ConfirmDialogService  
    ],
    entryComponents: [ ConfirmDialogComponent ],
})  
export class ConfirmDialogModule  
{  
}  