import {
  createComponentFactory,
  createHostFactory,
  Spectator,
  SpectatorHost,
} from "@ngneat/spectator/jest";
import { NgHelmetChildDirective } from "./ng-helmet-child.directive";
import { NgHelmetComponent } from "./ng-helmet.component";
import { NgHelmetService } from "./ng-helmet.service";

describe("NgHelmetComponent", () => {
  describe("while isolated", () => {
    let spectator: Spectator<NgHelmetComponent>;
    const createComponent = createComponentFactory({
      component: NgHelmetComponent,
      declarations: [NgHelmetChildDirective],
      mocks: [NgHelmetService],
    });

    beforeEach(() => (spectator = createComponent()));

    describe(".ngOnDestroy", () => {
      it("should pop the helmet stack", () => {
        const helmetService = spectator.inject(NgHelmetService);
        spectator.component.ngOnDestroy();
        expect(helmetService.popHelmet).toHaveBeenCalled();
      });
    });
  });

  describe("while in host", () => {
    let spectator: SpectatorHost<NgHelmetComponent>;
    const createHost = createHostFactory({
      component: NgHelmetComponent,
      declarations: [NgHelmetChildDirective],
      mocks: [NgHelmetService],
    });

    it("should harvest tags from content", () => {
      spectator = createHost(`<ng-helmet>
      <title>Home</title>
      <meta name="description" content="I'm da best mayne!">
    </ng-helmet>`);
      const helmetService = spectator.inject(NgHelmetService);

      expect(helmetService.pushHelmet).toHaveBeenCalledWith(
        expect.any(Number),
        {
          title: "Home",
          metas: {
            "name='description'": {
              name: "description",
              content: "I'm da best mayne!",
            },
          },
        }
      );
    });
  });
});
