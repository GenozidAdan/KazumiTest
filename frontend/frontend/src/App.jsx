import { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://kazumitest.onrender.com/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://kazumitest.onrender.com/api/users', { name, email });
      fetchUsers();
      setName('');
      setEmail('');
    } catch (error) {
      
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
      <UserList users={users} />
    </div>
  );
}

export default App;