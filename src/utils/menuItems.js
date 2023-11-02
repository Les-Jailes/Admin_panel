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
        title: 'Settings',
        url: '/settings',
      },
      {
        title: 'Sing out',
        url: '/sing-out',
      },
    ],
    icon:'bar'
  },
];