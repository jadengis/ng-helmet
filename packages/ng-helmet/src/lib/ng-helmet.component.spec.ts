import { createHostFactory, SpectatorHost } from "@ngneat/spectator/jest";

import { NgHelmetComponent } from "./ng-helmet.component";
import { NgHelmetService } from "./ng-helmet.service";

describe("NgHelmetComponent", () => {
  let spectator: SpectatorHost<NgHelmetComponent>;
  const createHost = createHostFactory({
    component: NgHelmetComponent,
    mocks: [NgHelmetService],
  });

  it("should harvest tags from content", () => {
    spectator = createHost(`<ng-helmet>
      <title>Home</title>
      <meta name="description" content="I'm da best mayne!">
    </ng-helmet>`);
    const helmetService = spectator.inject(NgHelmetService);

    expect(helmetService.pushHelmet).toHaveBeenCalledWith(expect.any(Number), {
      title: "Home",
      metas: {
        "name='description'": {
          name: "description",
          httpEquiv: "",
          content: "I'm da best mayne!",
        },
      },
    });
  });
});
