/*
 * Copyright (c) 2016-2023 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { fakeAsync, tick } from '@angular/core/testing';

import { ClrPopoverService } from '../../../utils/popover/providers/popover.service';
import { TooltipMouseService } from './tooltip-mouse.service';

export default function (): void {
  describe('Tooltip Mouse Service', () => {
    let popoverService: ClrPopoverService;
    let mouseService: TooltipMouseService;

    beforeEach(() => {
      popoverService = new ClrPopoverService();
      mouseService = new TooltipMouseService(popoverService);
    });

    it('should show the tooltip when the mouse enters the trigger', () => {
      mouseService.onMouseEnterTrigger();

      expect(popoverService.open).toBe(true);
    });

    it('should hide the tooltip if the mouse leaves the trigger and does not enter the content', fakeAsync(() => {
      popoverService.open = true;

      mouseService.onMouseLeaveTrigger();
      tick();

      expect(popoverService.open).toBe(false);
    }));

    it('should hide the tooltip if the mouse leaves the content and does not enter the trigger', fakeAsync(() => {
      popoverService.open = true;

      mouseService.onMouseLeaveContent();
      tick();

      expect(popoverService.open).toBe(false);
    }));

    it('should not hide the tooltip as the mouse moves from the trigger to the content', fakeAsync(() => {
      popoverService.open = true;

      mouseService.onMouseLeaveTrigger();
      mouseService.onMouseEnterContent();
      tick();

      expect(popoverService.open).toBe(true);
    }));
  });
}
