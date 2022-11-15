import { reactive } from 'vue'

export const tasks = reactive([
  {
    id: '1',
    title: 'Create prototype with JWT authentication',
    state: 'new',
    dueDate: '3 weeks',
    participants: [
      {
        color: 'warning',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg',
      },
    ],
  },
  {
    id: '2',
    title: 'Design a todo list component using React',
    state: 'new',
    dueDate: '3 weeks',
    participants: [
      {
        color: 'info',
        picture: '/images/avatars/svg/vuero-1.svg',
      },
    ],
  },
  {
    id: '3',
    title: 'Implement the users REST API',
    state: 'progress',
    dueDate: '3 days',
    participants: [
      {
        color: 'danger',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Napa_cabbages.png/640px-Napa_cabbages.png',
      },
      {
        color: undefined,
        picture: 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg26.jpg',
      },
      {
        color: undefined,
        picture: 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg19.jpg',
      },
    ],
  },
  {
    id: '4',
    title: 'Review project wireframes',
    state: 'progress',
    dueDate: '1 week',
    participants: [
      {
        color: 'success',
        picture: 'https://s3.theasianparent.com/tap-assets-prod/wp-content/uploads/sites/24/2021/01/barbarossa.jpg',
      },
    ],
  },
  {
    id: '5',
    title: 'Implement new footer in all pages',
    state: 'progress',
    dueDate: '5 days',
    participants: [
      {
        color: 'info',
        picture: 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg16.jpg',
      },
    ],
  },
  {
    id: '6',
    title: 'Implement the projects REST API',
    state: 'ready',
    dueDate: '2 days',
    participants: [
      {
        color: 'warning',
        picture: '/images/avatars/svg/vuero-1.svg',
      },
    ],
  },
  {
    id: '7',
    title: 'Landing page redesign',
    state: 'completed',
    dueDate: 'On time',
    participants: [
      {
        color: 'success',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Napa_cabbages.png/640px-Napa_cabbages.png',
      },
    ],
  },
  {
    id: '8',
    title: 'Projects REST API Implementation',
    state: 'completed',
    dueDate: 'On time',
    participants: [
      {
        color: 'danger',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg',
      },
      {
        picture: 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg9.jpg',
      },
    ],
  },
  {
    id: '9',
    title: 'Database replication setup',
    state: 'completed',
    dueDate: 'On time',
    participants: [
      {
        color: 'primary',
        picture: 'https://s3.theasianparent.com/tap-assets-prod/wp-content/uploads/sites/24/2021/01/barbarossa.jpg',
      },
    ],
  },
  {
    id: '10',
    title: 'Firebase demo application setup',
    state: 'completed',
    dueDate: 'On time',
    participants: [
      {
        color: 'warning',
        picture: 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg16.jpg',
      },
    ],
  },
])
