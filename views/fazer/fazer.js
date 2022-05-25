const splide = new Splide('.splide', {
    type: 'loop',
    perPage: 4,
    gap: '2%',
    breakpoints: {
      1366: {
        gap: '1%',
        perPage: 4,
      },
      768: {
        gap: '1%',
        perPage: 2,
      },
    },
  });
  splide.mount(window.splide.Extensions);