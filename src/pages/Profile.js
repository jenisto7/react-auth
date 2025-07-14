import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('https://reqres.in/api/users/2')
      .then((res) => setUser(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl">Profile</h1>
      {user ? (
        <div className="mt-4">
          <img src={user.avatar} alt="avatar" className="rounded-full w-24" />
          <p>Name: {user.first_name} {user.last_name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
