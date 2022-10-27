// Add Icon
function renderPicture(data: any /*, cell:  any, row: any*/) {
  return `
          <div class="v-avatar">
              <img class="avatar" src="${data}" alt="">
          </div>
      `
}

// Name
function renderName(data: any /*, cell: any, row: any */) {
  return `<span class="has-dark-text dark-inverted is-font-alt is-weight-600 rem-90">${data}</span>`
}

// Position
function renderPosition(data: any /*, cell: any, row: any */) {
  return `<span class="light-text">${data}</span>`
}

// Status
function renderStatus(data: any /*, cell: any, row: any */) {
  return `
          <div class="status is-${data}">
              <i aria-hidden="true" class="fas fa-circle"></i>
              <span class="is-capitalize">${data}</span>
          </div>
      `
}

// Button
function renderButton(data: any, cell: any, row: any) {
  return `<div class="has-text-right"><button class="button v-button is-dark-outlined" data-row="${row.dataIndex}">Manage</button></div>`
}

export const datatableV1 = {
  perPageSelect: [5, 10, 20, 25, 50, 100],
  perPage: 10,
  columns: [
    { select: 0, hidden: true },
    { select: 1, render: renderPicture, sortable: false },
    { select: 2, render: renderName },
    { select: 3, render: renderPosition },
    { select: 4, render: renderStatus },
    { select: 5, render: renderButton, sortable: false },
  ],
  data: {
    headings: ['ID', 'Picture', 'Name', 'Position', 'Status', 'Actions'],
    data: [
      [
        0,
        '/images/avatars/svg/vuero-1.svg',
        'Erik Kovalsky',
        'Product Manager',
        'busy',
        true,
      ],
      [1, 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg7.jpg', 'Alice Carasca', 'Software Engineer', 'offline', true],
      [2, 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg13.jpg', 'Tara Svenson', 'UI/UX Designer', 'offline', true],
      [3, 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg5.jpg', 'Mary Lebowski', 'Project Manager', 'available', true],
      [
        4,
        '/images/avatars/placeholder-f.jpg',
        'Kaylee Jennings',
        'Web Developer',
        'available',
        true,
      ],
      [5, 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg27.jpg', 'Carmen Escudero', 'HR Manager', 'offline', true],
      [6, 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg22.jpg', 'Dwayne Hicks', 'Product Manager', 'offline', true],
      [
        7,
        '/images/avatars/placeholder-m.jpg',
        'Paul Morris',
        'Backend Developer',
        'available',
        true,
      ],
      [
        8,
        'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg23.jpg',
        'Irina Vierbovsky',
        'Project Manager',
        'available',
        true,
      ],
      [9, 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg28.jpg', 'Edouard Falant', 'Web Developer', 'busy', true],
      [
        10,
        '/images/avatars/placeholder-f.jpg',
        'Shana Williams',
        'Sales Manager',
        'offline',
        true,
      ],
      [
        11,
        '/images/avatars/placeholder-m.jpg',
        'Benjamin Hoffman',
        'Product Manager',
        'offline',
        true,
      ],
      [12, 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg39.jpg', 'Alejandro Badajoz', 'Web Developer', 'busy', true],
      [
        13,
        'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg21.jpg',
        'Elizabeth Fisher',
        'Mobile Developer',
        'available',
        true,
      ],
      [14, 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg37.jpg', 'Helmut Fritz', 'Product Manager', 'available', true],
      [15, 'https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg31.jpg', 'Yasseen Amzi', 'Business Analyst', 'offline', true],
    ],
  },
}
