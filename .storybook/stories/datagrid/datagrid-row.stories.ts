/*
 * Copyright (c) 2016-2023 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClrConditionalModule, ClrDatagridModule, ClrDatagridRow } from '@clr/angular';
import { action } from '@storybook/addon-actions';
import { moduleMetadata, Story, StoryObj } from '@storybook/angular';

import { elements } from '../../helpers/elements.data';

const RowTemplate: Story = args => ({
  template: `
    <style>
      .highlight { border: 1px solid red !important; }
      .electronegativity-container { border-bottom: 4px solid #119cd4; }
    </style>
    <clr-datagrid
      ${args.height ? '[style.height.px]="height"' : ''}
      ${args.multiSelectable ? '[clrDgSelected]="[]"' : ''}
      ${args.singleSelectable ? '[clrDgSingleSelected]="true"' : ''}
      [ngClass]="{ 'datagrid-compact': compact }"
    >
      <clr-dg-column [style.width.px]="250">
        <ng-container ${args.hidableColumns ? '*clrDgHideableColumn' : ''}>Name</ng-container>
      </clr-dg-column>
      <clr-dg-column [style.width.px]="250">
        <ng-container ${args.hidableColumns ? '*clrDgHideableColumn' : ''}>Symbol</ng-container>
      </clr-dg-column>
      <clr-dg-column [style.width.px]="250">
        <ng-container ${args.hidableColumns ? '*clrDgHideableColumn' : ''}>Number</ng-container>
      </clr-dg-column>
      <clr-dg-column>
        <ng-container ${args.hidableColumns ? '*clrDgHideableColumn' : ''}>Electronegativity</ng-container>
      </clr-dg-column>

      <clr-dg-row
        *clrDgItems="let element of elements; let index = index"
        [clrDgExpanded]="clrDgExpanded && index === 0"
        [clrDgSelectable]="index !== 0 || clrDgSelectable"
        [clrDgSelected]="clrDgSelected && index === 0"
        [clrDgDetailOpenLabel]="clrDgDetailOpenLabel"
        [clrDgDetailCloseLabel]="clrDgDetailCloseLabel"
        [clrDgItem]="element"
        [clrDgRowSelectionLabel]="clrDgRowSelectionLabel ? clrDgRowSelectionLabel + ' ' + element.name : undefined"
        [ngClass]="{ highlight: highlight && index === 0 }"
        (clrDgExpandedChange)="index === 0 && clrDgExpandedChange($event)"
        (clrDgSelectedChange)="index === 0 && clrDgSelectedChange($event)"
      >
        <clr-dg-cell>{{element.name}}</clr-dg-cell>
        <clr-dg-cell>{{element.symbol}}</clr-dg-cell>
        <clr-dg-cell>{{element.number}}</clr-dg-cell>
        <clr-dg-cell>
          <div [style.width.%]="element.electronegativity * 100 / 4" class="electronegativity-container">
            {{element.electronegativity}}
          </div>
        </clr-dg-cell>
        <ng-container *ngIf="expandable" ngProjectAs="clr-dg-row-detail">
          <clr-dg-row-detail *clrIfExpanded>{{element|json}}</clr-dg-row-detail>
        </ng-container>
      </clr-dg-row>

      <clr-dg-footer>
        <clr-dg-pagination #pagination>
          <clr-dg-page-size [clrPageSizeOptions]="[10,20,50,100]">Elements per page</clr-dg-page-size>
          {{pagination.firstItem + 1}} - {{pagination.lastItem + 1}} of {{pagination.totalItems}} elements
        </clr-dg-pagination>
      </clr-dg-footer>
    </clr-datagrid>
  `,
  props: { ...args },
});
export default {
  title: 'Datagrid/Row',
  component: ClrDatagridRow,
  decorators: [
    moduleMetadata({
      imports: [ClrDatagridModule, ClrConditionalModule],
    }),
  ],
  argTypes: {
    // inputs
    clrDgDetailCloseLabel: { defaultValue: '' },
    clrDgDetailOpenLabel: { defaultValue: '' },
    clrDgExpanded: { defaultValue: false, control: { type: 'boolean' } },
    clrDgItem: { control: { disable: true } },
    clrDgRowSelectionLabel: { defaultValue: 'Select row for' },
    clrDgSelectable: { defaultValue: true, control: { type: 'boolean' } },
    clrDgSelected: { defaultValue: false, control: { type: 'boolean' } },
    // outputs
    clrDgExpandedChange: { control: { disable: true } },
    clrDgSelectedChange: { control: { disable: true } },
    // methods
    toggle: { control: { disable: true } },
    toggleExpand: { control: { disable: true } },
    // story helpers
    elements: { control: { disable: true }, table: { disable: true } },
  },
  args: {
    // outputs
    clrDgExpandedChange: action('clrDgExpandedChange'),
    clrDgSelectedChange: action('clrDgSelectedChange'),
    // story helpers
    elements,
    highlight: true,
    singleSelectable: false,
    multiSelectable: false,
    expandable: false,
    compact: false,
    hidableColumns: false,
    height: 0,
  },
};

export const Row: StoryObj = {
  render: RowTemplate,
};

export const singleSelection: StoryObj = {
  render: RowTemplate,
  args: {
    singleSelectable: true,
  },
};
export const multiSelection: StoryObj = {
  render: RowTemplate,
  args: {
    multiSelectable: true,
  },
};
