import { createComponentFactory, Spectator } from "@ngneat/spectator/jest";

import { NgHelmetTitleComponent } from "./ng-helmet-title.component";

describe("NgHelmetTitleComponent", () => {
  describe("while isolated", () => {
    let spectator: Spectator<NgHelmetTitleComponent>;
    const createComponent = createComponentFactory(NgHelmetTitleComponent);

    beforeEach(() => (spectator = createComponent()));

    it("should create", () => {
      expect(spectator.component).toBeTruthy();
    });
  });
});
