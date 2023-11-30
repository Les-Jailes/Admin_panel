export const menuItems = [
  {
    alt: 'user profile website',
    src: '/user-profile.png',
    url: '/user-profile',
    icon: 'user'
  },
  {
    alt: 'menu bar',
    src: '/menu-bar.png',
    url: '/',
    submenu: [
      {
        title: 'Admin panel',
        url: '/',
      },
      {
        title: 'Taxes',
        url: '/countries',
      },
    ],
    icon:'bar'
  },
];