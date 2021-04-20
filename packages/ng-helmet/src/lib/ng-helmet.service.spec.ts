import { createServiceFactory, SpectatorService } from "@ngneat/spectator/jest";

import { Meta, Title } from "@angular/platform-browser";

import { NgHelmetService } from "./ng-helmet.service";
import { NgHelmet } from "./ng-helmet.model";

describe("NgHelmetService", () => {
  let spectator: SpectatorService<NgHelmetService>;
  const createService = createServiceFactory({
    service: NgHelmetService,
    mocks: [Title, Meta],
  });

  const helmet: NgHelmet = {
    title: "Home | Replay Value",
    metas: {
      "name='description'": {
        name: "description",
        content: "A very good website",
      },
    },
  };

  const otherHelmet: NgHelmet = {
    metas: {
      "property='og:title'": {
        name: "og:title",
        content: "Home",
      },
    },
  };

  beforeEach(() => {
    spectator = createService();
  });

  describe(".pushHelmet", () => {
    it("should setTitle and add tags when passed a helmet", () => {
      const service = spectator.service;
      const title = spectator.inject(Title);
      const meta = spectator.inject(Meta);
      meta.getTag.mockReturnValue(null);

      service.pushHelmet(0, helmet);
      expect(title.setTitle).toHaveBeenCalledWith(helmet.title);
      expect(meta.addTag).toHaveBeenCalledWith(
        helmet.metas["name='description'"]
      );
    });

    it("should update the tag if it exists", () => {
      const service = spectator.service;
      const title = spectator.inject(Title);
      const meta = spectator.inject(Meta);
      meta.getTag.mockReturnValue((true as unknown) as HTMLMetaElement);

      service.pushHelmet(0, helmet);
      expect(title.setTitle).toHaveBeenCalledWith(helmet.title);
      expect(meta.updateTag).toHaveBeenCalledWith(
        helmet.metas["name='description'"]
      );
    });

    it("should remove tags when passed no content", () => {
      const service = spectator.service;
      const title = spectator.inject(Title);
      const meta = spectator.inject(Meta);

      service.pushHelmet(0, {
        ...helmet,
        metas: {
          "name='description'": {
            name: "description",
          },
        },
      });
      expect(title.setTitle).toHaveBeenCalledWith(helmet.title);
      expect(meta.removeTag).toHaveBeenCalledWith("name='description'");
    });

    it("should merge meta tags from repeated calls", () => {
      const service = spectator.service;
      const title = spectator.inject(Title);
      const meta = spectator.inject(Meta);
      meta.getTag.mockImplementation((input) => {
        if (input === "name='description'") {
          return (true as unknown) as HTMLMetaElement;
        }
        return null;
      });

      service.pushHelmet(0, helmet);
      title.setTitle.reset();
      meta.updateTag.reset();
      meta.addTag.reset();

      service.pushHelmet(1, otherHelmet);
      expect(title.setTitle).toHaveBeenCalledWith(helmet.title);
      expect(meta.updateTag).toHaveBeenCalledWith(
        helmet.metas["name='description'"]
      );
      expect(meta.addTag).toHaveBeenCalledWith(
        otherHelmet.metas["property='og:title'"]
      );
    });
  });

  describe(".popHelmet", () => {
    it("should recompute the helmet and apply", () => {
      const service = spectator.service;
      const title = spectator.inject(Title);
      const meta = spectator.inject(Meta);
      meta.getTag.mockReturnValue(null);

      service.pushHelmet(0, helmet);
      service.pushHelmet(1, otherHelmet);
      title.setTitle.reset();
      meta.removeTag.reset();

      service.popHelmet();
      expect(title.setTitle).toHaveBeenCalledWith(helmet.title);
      expect(meta.removeTag).toHaveBeenCalledWith("property='og:title'");
    });
  });
});
