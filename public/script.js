// Function to add a new menu
async function addMenu() {
    const parentMenu = document.getElementById('parentMenu').value;
    const menuSlug = document.getElementById('menuSlug').value;
    const menuName = document.getElementById('menuName').value; // New menuName field
  
    const response = await fetch('/api/menus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ parentMenu, menuSlug, menuName }) // Include menuName
    });
  
    const data = await response.json();
    if (response.ok) {
      displayMenus();
    } else {
      console.error(data.error || 'Failed to add menu');
    }
  }
  
  // Function to update a menu
  async function updateMenu(index, updatedMenu) {
    const response = await fetch(`/api/menus/${index}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedMenu)
    });
  
    const data = await response.json();
    if (response.ok) {
      displayMenus();
    } else {
      console.error(data.error || 'Failed to update menu');
    }
  }
  
  // Function to delete a menu
  async function deleteMenu(index) {
    const response = await fetch(`/api/menus/${index}`, {
      method: 'DELETE'
    });
  
    const data = await response.json();
    if (response.ok) {
      displayMenus();
    } else {
      console.error(data.error || 'Failed to delete menu');
    }
  }
  
  // Function to display menus
  async function displayMenus() {
    const response = await fetch('/api/menus');
    const menus = await response.json();
  
    const menusList = document.getElementById('menus');
    menusList.innerHTML = '';
  
    menus.forEach((menu, index) => {
      const li = document.createElement('li');
  
      const inputParentMenu = document.createElement('input');
      inputParentMenu.type = 'text';
      inputParentMenu.value = menu.parentMenu || '';
      inputParentMenu.addEventListener('change', (event) => {
        const updatedMenu = { parentMenu: event.target.value, menuName: menu.menuName, menuSlug: menu.menuSlug };
        updateMenu(index, updatedMenu);
      });
  
      const inputMenuName = document.createElement('input');
      inputMenuName.type = 'text';
      inputMenuName.value = menu.menuName || '';
      inputMenuName.addEventListener('change', (event) => {
        const updatedMenu = { parentMenu: menu.parentMenu, menuName: event.target.value, menuSlug: menu.menuSlug };
        updateMenu(index, updatedMenu);
      });
  
      const inputMenuSlug = document.createElement('input');
      inputMenuSlug.type = 'text';
      inputMenuSlug.value = menu.menuSlug || '';
      inputMenuSlug.addEventListener('change', (event) => {
        const updatedMenu = { parentMenu: menu.parentMenu, menuName: menu.menuName, menuSlug: event.target.value };
        updateMenu(index, updatedMenu);
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteMenu(index);
      });
  
      li.appendChild(inputParentMenu);
      li.appendChild(inputMenuName);
      li.appendChild(inputMenuSlug);
      li.appendChild(deleteButton);
      menusList.appendChild(li);
    });
  }
  
  // Display menus when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    displayMenus();
  });
  