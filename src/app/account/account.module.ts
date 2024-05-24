import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        ActivateAccountComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        SharedModule
    ]
})
export class AccountModule { }
