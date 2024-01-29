// DrawerPage.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// Example category data
const categoriesData = [
  {
    id: 1,
    name: 'Men',
    subcategories: [],
  },
  {
    id: 2,
    name: 'Women',
    subcategories: [],
  },
  {
    id: 3,
    name: 'Winter',
    subcategories: [],
  },
  {
    id: 4,
    name: 'New Arrival',
    subcategories: [
      {
        id: 41,
        name: 'Baby',
        subcategories: [],
      },
      {
        id: 42,
        name: 'Men',
        subcategories: [],
      },
      {
        id: 43,
        name: 'Women',
        subcategories: [],
      },
      // Add more subcategories as needed
    ],
  },
];

const DrawerPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [subDrawerOpen, setSubDrawerOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});
  const [currentSubcategories, setCurrentSubcategories] = useState([]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
    if (!open) {
      // Close sub-drawer before category drawer
      setSubDrawerOpen(false);
      setCurrentCategory({});
      setCurrentSubcategories([]);
    }
  };

  const toggleSubDrawer = (category) => () => {
    setSubDrawerOpen(true);
    setCurrentCategory(category);
    setCurrentSubcategories(category.subcategories || []);
  };

  const renderCategories = (categories) => (
    <List>
      {categories.map((category) => (
        <ListItem
          button
          key={category.id}
          onClick={
            category.subcategories.length > 0
              ? toggleSubDrawer(category)
              : undefined
          }
        >
          <ListItemText primary={category.name} />
        </ListItem>
      ))}
    </List>
  );

  const renderSubcategories = () => (
    <List>
      {currentSubcategories.map((subcategory) => (
        <ListItem button key={subcategory.id}>
          <ListItemText primary={subcategory.name} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Categories</Button>
      <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer(false)}>
        {renderCategories(categoriesData)}
      </Drawer>
      <Drawer anchor='left' open={subDrawerOpen} onClose={toggleSubDrawer({})}>
        <div style={{ width: 250 }}>{renderSubcategories()}</div>
      </Drawer>
    </div>
  );
};

export default DrawerPage;
