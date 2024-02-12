/*
 * Copyright (c) 2016-2023 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrCheckboxGroupContainerModule } from '../../../../angular/src/forms/checkbox-group-container';
import { CheckboxesDemo } from './checkboxes.demo';
import { ROUTING } from './checkboxes.demo.routing';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ClarityModule, ROUTING, ClrCheckboxGroupContainerModule],
  declarations: [CheckboxesDemo],
  exports: [CheckboxesDemo],
})
export class CheckboxesDemoModule {}
