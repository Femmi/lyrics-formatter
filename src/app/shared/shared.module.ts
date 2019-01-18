import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { MatIconModule } from '@angular/material/icon';

import { DialogViewComponent } from './dialog/dialog.view.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule, MatIconModule],
  declarations: [DialogViewComponent, SnackBarComponent],
  exports: [DialogViewComponent],
  entryComponents: [DialogViewComponent, SnackBarComponent],
})
export class SharedModule {}
