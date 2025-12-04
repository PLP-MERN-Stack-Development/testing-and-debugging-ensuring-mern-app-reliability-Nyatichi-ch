import React, { useState } from 'react';
import { createBug } from '../api';

export default function BugForm({ onNewBug }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const bug = await createBug({ title, description });
      console.log('Created bug:', bug);
      onNewBug(bug);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error creating bug:', err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Report a bug</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>Title:</label><br/>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label><br/>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
