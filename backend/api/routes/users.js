const express = require('express');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    // Simulate database query
    const users = [
      {
        id: '1',
        email: 'user1@example.com',
        name: 'John Doe',
        role: 'user',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'user2@example.com',
        name: 'Jane Smith',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ];

    res.json({
      success: true,
      data: users,
      total: users.length
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      error: 'Failed to fetch users',
      message: error.message
    });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Simulate database query
    const user = {
      id: id,
      email: 'user@example.com',
      name: 'Demo User',
      role: 'user',
      profile: {
        avatar: 'https://via.placeholder.com/150',
        bio: 'AI enthusiast and developer'
      },
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Failed to fetch user',
      message: error.message
    });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Simulate database update
    const updatedUser = {
      id: id,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      error: 'Failed to update user',
      message: error.message
    });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Simulate database deletion
    res.json({
      success: true,
      message: 'User deleted successfully',
      id: id
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      error: 'Failed to delete user',
      message: error.message
    });
  }
});

module.exports = router;
