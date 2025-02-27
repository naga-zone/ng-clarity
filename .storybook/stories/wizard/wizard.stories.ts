/*
 * Copyright (c) 2016-2023 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClrWizard, ClrWizardModule, commonStringsDefault } from '@clr/angular';
import { action } from '@storybook/addon-actions';
import { moduleMetadata, Story, StoryObj } from '@storybook/angular';

export default {
  title: 'Wizard/Wizard',
  component: ClrWizard,
  decorators: [
    moduleMetadata({
      imports: [ClrWizardModule, BrowserAnimationsModule],
    }),
  ],
  argTypes: {
    // inputs
    clrHeadingLevel: { defaultValue: 1, control: { type: 'number', min: 1, max: 6 } },
    clrWizardOpen: { defaultValue: true }, // the default value is really false, but that doesn't really work for the story
    clrWizardClosable: { defaultValue: true },
    clrWizardDisableStepnav: { defaultValue: false },
    clrWizardPreventNavigation: { defaultValue: false },
    clrWizardForceForwardNavigation: { defaultValue: false },
    clrWizardPreventDefaultNext: { defaultValue: false },
    clrWizardPreventDefaultCancel: { defaultValue: false },
    clrWizardStepnavAriaLabel: { defaultValue: commonStringsDefault.wizardStepnavAriaLabel },
    clrWizardSize: { defaultValue: 'xl', control: { type: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] } },
    // outputs
    clrWizardOpenChange: { control: { disable: true } },
    clrWizardCurrentPageChanged: { control: { disable: true } },
    clrWizardOnNext: { control: { disable: true } },
    clrWizardOnPrevious: { control: { disable: true } },
    clrWizardOnCancel: { control: { disable: true } },
    clrWizardOnFinish: { control: { disable: true } },
    clrWizardOnReset: { control: { disable: true } },
    // methods
    cancel: { control: { disable: true } },
    checkAndCancel: { control: { disable: true } },
    close: { control: { disable: true } },
    finish: { control: { disable: true } },
    forceFinish: { control: { disable: true } },
    forceNext: { control: { disable: true } },
    goTo: { control: { disable: true } },
    modalCancel: { control: { disable: true }, table: { disable: true } },
    next: { control: { disable: true } },
    open: { control: { disable: true } },
    previous: { control: { disable: true } },
    reset: { control: { disable: true } },
    toggle: { control: { disable: true } },
    // story helpers
    createArray: { control: { disable: true }, table: { disable: true } },
    pageCount: { control: { type: 'number', min: 1, max: 100 } },
  },
  args: {
    // outputs
    clrWizardOpenChange: action('clrWizardOpenChange'),
    clrWizardCurrentPageChanged: action('clrWizardCurrentPageChanged'),
    clrWizardOnNext: action('clrWizardOnNext'),
    clrWizardOnPrevious: action('clrWizardOnPrevious'),
    clrWizardOnCancel: action('clrWizardOnCancel'),
    clrWizardOnFinish: action('clrWizardOnFinish'),
    clrWizardOnReset: action('clrWizardOnFinish'),
    // story helpers
    createArray: n => new Array(n),
    pageCount: 4,
  },
};

const WizardTemplate: Story = args => ({
  template: `
    <clr-wizard
      [clrWizardOpen]="clrWizardOpen"
      [clrWizardClosable]="clrWizardClosable"
      [clrWizardDisableStepnav]="clrWizardDisableStepnav"
      [clrWizardPreventNavigation]="clrWizardPreventNavigation"
      [clrWizardForceForwardNavigation]="clrWizardForceForwardNavigation"
      [clrWizardPreventDefaultNext]="clrWizardPreventDefaultNext"
      [clrWizardPreventDefaultCancel]="clrWizardPreventDefaultCancel"
      [clrWizardSize]="clrWizardSize"
      [clrWizardStepnavAriaLabel]="clrWizardStepnavAriaLabel"
      (clrWizardOpenChange)="clrWizardOpenChange($event)"
      (clrWizardCurrentPageChanged)="clrWizardCurrentPageChanged($event)"
      (clrWizardOnNext)="clrWizardOnNext($event)"
      (clrWizardOnPrevious)="clrWizardOnPrevious($event)"
      (clrWizardOnCancel)="clrWizardOnCancel($event)"
      (clrWizardOnFinish)="clrWizardOnFinish($event)"
      (clrWizardOnReset)="clrWizardOnReset($event)"
    >
      <clr-wizard-title [clrHeadingLevel]="clrHeadingLevel">Wizard</clr-wizard-title>

      <clr-wizard-button type="cancel">Cancel</clr-wizard-button>
      <clr-wizard-button type="previous">Previous</clr-wizard-button>
      <clr-wizard-button type="next">Next</clr-wizard-button>
      <clr-wizard-button type="finish">Finish</clr-wizard-button>

      <clr-wizard-page *ngFor="let _ of createArray(pageCount); let i = index">
        <ng-template clrPageTitle>Page {{ i + 1 }}</ng-template>
        <p>Content for page {{ i + 1 }}.</p>
      </clr-wizard-page>
    </clr-wizard>
  `,
  props: { ...args },
});

export const Wizard: StoryObj = {
  render: WizardTemplate,
};
