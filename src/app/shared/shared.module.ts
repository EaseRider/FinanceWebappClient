import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule, FormsModule, MaterialModule
  ],
  providers: []
})
export class SharedModule {
}
