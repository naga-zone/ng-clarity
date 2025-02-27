/*
 * Copyright (c) 2016-2023 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClrFormLayout, ClrFormsModule, ClrLayoutModule } from '@clr/angular';
import { moduleMetadata, Story, StoryObj } from '@storybook/angular';
import { CommonModules } from 'helpers/common';

const formMappingKey = 'form-mapping-key';
const patterns = {
  alphaNumeric: /^[a-z\d]+$/i,
  letters: /[a-z]/i,
  numbers: /\d/i,
};

export default {
  title: 'Forms/Template Driven',
  decorators: [
    moduleMetadata({
      imports: [...CommonModules, ClrLayoutModule, ClrFormsModule],
    }),
  ],
  argTypes: {
    // inputs
    clrLabelSize: { defaultValue: 2, control: { type: 'number', min: 1, max: 12 } },
    // story helpers
    patterns: { control: { disable: true }, table: { disable: true } },
    data: { control: { disable: true }, table: { disable: true }, mapping: { [formMappingKey]: getForm() } },
    clrLayout: {
      control: { type: 'radio', options: Object.values(ClrFormLayout).filter(value => typeof value === 'string') },
    },
  },
  args: {
    // story helpers
    patterns,
    clrLayout: ClrFormLayout.HORIZONTAL,
    screenReaderContent: 'Please fill out the form',
    data: formMappingKey,
  },
};

const TemplateDrivenStory: Story = args => ({
  template: ` 
    <form clrForm [clrLayout]="clrLayout" [clrLabelSize]="clrLabelSize">
      <span class="clr-sr-only">{{screenReaderContent}}</span>
      <clr-input-container>
        <label>Name</label>
        <input clrInput [(ngModel)]="data.name" required name="name"/>
        <clr-control-helper>Helper text that shows while it is pristine and valid</clr-control-helper>
        <clr-control-success>Name is valid</clr-control-success>
        <clr-control-error *clrIfError="'required'">Name is required</clr-control-error>
        <clr-control-error *clrIfError="'minlength'">Must be at least 5 characters</clr-control-error>
        <clr-control-error *clrIfError="'pattern'">Must contain only alpha-numeric characters</clr-control-error>
      </clr-input-container>
      <clr-input-container>
        <label>Age</label>
        <input clrInput [(ngModel)]="data.age" type="number" min="0" required name="age"/>
        <clr-control-helper>Helper text that shows while it is pristine and valid</clr-control-helper>
        <clr-control-success>Age is valid</clr-control-success>
        <clr-control-error *clrIfError="'required'">Age is required</clr-control-error>
        <clr-control-error *clrIfError="'min'">Must be at least 5 years old</clr-control-error>
        <clr-control-error *clrIfError="'max'">Must be less than 100 years old</clr-control-error>
      </clr-input-container>
      <clr-password-container>
        <label>Password</label>
        <input clrPassword autocomplete="current-password" [(ngModel)]="data.password" required name="password"/>
        <clr-control-helper>Helper text that shows while it is pristine and valid</clr-control-helper>
        <clr-control-success>Password is valid</clr-control-success>
        <clr-control-error *clrIfError="'required'">Password is required</clr-control-error>
        <clr-control-error *clrIfError="'minlength'">Must be at least 8 characters</clr-control-error>
        <clr-control-error *clrIfError="'pattern'; error as error">
          <ng-container [ngSwitch]="error.requiredPattern">
            <ng-container *ngSwitchCase="patterns.alphaNumeric.toString()">Must contain only letters and numbers</ng-container>
            <ng-container *ngSwitchCase="patterns.letters.toString()">Must contain at least one letter</ng-container>
            <ng-container *ngSwitchCase="patterns.numbers.toString()">Must contain at least one number</ng-container>
          </ng-container>
        </clr-control-error>
      </clr-password-container>
      <clr-textarea-container>
        <label>Description</label>
        <textarea clrTextarea [(ngModel)]="data.description" required name="description"></textarea>
        <clr-control-helper>Helper text that shows while it is pristine and valid</clr-control-helper>
        <clr-control-success>Description is valid</clr-control-success>
        <clr-control-error *clrIfError="'required'">Description is required</clr-control-error>
        <clr-control-error *clrIfError="'minlength'">Must be at least 5 characters</clr-control-error>
        <clr-control-error *clrIfError="'pattern'">Must contain only alpha-numeric characters</clr-control-error>
      </clr-textarea-container>
    </form>
  `,
  props: args,
});

function getForm() {
  return {
    name: '',
    age: null,
    password: '',
    description: '',
  };
}

export const HorizontalLayout: StoryObj = {
  render: TemplateDrivenStory,
};

export const VerticalLayout: StoryObj = {
  render: TemplateDrivenStory,
  args: { namePlaceholder: 'Test placeholder', clrLayout: ClrFormLayout.VERTICAL },
};

export const CompactLayout: StoryObj = {
  render: TemplateDrivenStory,
  args: { namePlaceholder: 'Test placeholder', clrLayout: ClrFormLayout.COMPACT },
};
