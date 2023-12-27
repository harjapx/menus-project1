const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let menus = []; // Temporary storage for menus

app.use(express.static('public'));
app.use(express.json());

// Route to handle adding a new menu
app.post('/api/menus', (req, res) => {
  const { parentMenu, menuSlug, menuName } = req.body; // Include menuName
  const newMenu = { parentMenu, menuSlug, menuName }; // Save menuName
  menus.push(newMenu);
  res.json({ message: 'Menu added successfully', menu: newMenu });
});

// Route to get all menus
app.get('/api/menus', (req, res) => {
  res.json(menus);
});

// Route to update a menu by index
app.put('/api/menus/:index', (req, res) => {
  const { index } = req.params;
  const { menuName, menuSlug } = req.body;
  if (index >= 0 && index < menus.length) {
    menus[index].menuName = menuName;
    menus[index].menuSlug = menuSlug;
    res.json({ message: 'Menu updated successfully', menu: menus[index] });
  } else {
    res.status(404).json({ error: 'Menu not found' });
  }
});

// Route to delete a menu by index
app.delete('/api/menus/:index', (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < menus.length) {
    menus.splice(index, 1);
    res.json({ message: 'Menu deleted successfully' });
  } else {
    res.status(404).json({ error: 'Menu not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
