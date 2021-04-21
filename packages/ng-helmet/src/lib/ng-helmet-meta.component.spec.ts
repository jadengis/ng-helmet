import { createComponentFactory, Spectator } from "@ngneat/spectator/jest";

import { NgHelmetMetaComponent } from "./ng-helmet-meta.component";

describe("NgHelmetMetaComponent", () => {
  describe("while isolated", () => {
    let spectator: Spectator<NgHelmetMetaComponent>;
    const createComponent = createComponentFactory(NgHelmetMetaComponent);

    beforeEach(() => (spectator = createComponent()));

    it("should create", () => {
      expect(spectator.component).toBeTruthy();
    });
  });
});
