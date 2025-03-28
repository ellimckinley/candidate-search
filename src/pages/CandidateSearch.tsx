import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateSearch = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userIndex, setUserIndex] = useState(0);
  const [users, setUsers] = useState<{ login: string }[]>([]);
  const [reposUrl, setReposUrl] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      // Fetch user details from GitHub API
      fetch(`https://api.github.com/users/${username}`, {
        // headers: {
        //   Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Use GitHub token from .env file
        // },
      })
        .then((response) => response.json())
        .then((user) => {
          setName(user.name || 'Name not available');
          setLocation(user.location || 'Location not available');
          setCompany(user.company || 'Company not available');
          setBio(user.bio || 'Bio not available');
          setAvatar(user.avatar_url || '');
          setReposUrl(user.html_url ? `${user.html_url}?tab=repositories` : '');

          // Fetch user email from GitHub API
          fetch(`https://api.github.com/user/public_emails`, {
        headers: {
          Authorization: `Bearer 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`, // Use GitHub token from .env file
        },
          })
        .then((response) => response.json())
        .then((emails: { primary: boolean; email: string }[]) => {
          const primaryEmail = emails.find((email) => email.primary)?.email || 'Email not available';
          setEmail(primaryEmail);
        })
        .catch((error) => {
          console.error('Error fetching user emails:', error);
          setEmail('Email not available');
        });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [username]);

  const fetchUsers = () => {
    fetch('https://api.github.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        if (data.length > 0) {
          setUsername(data[0].login);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const fetchFullName = () => {
    if (username) {
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.name) {
            console.log('Full Name:', data.name);
          } else {
            console.log('Full Name not available');
          }
        })
        .catch((error) => {
          console.error('Error fetching full name:', error);
        });
    }
  };

  const handleNextUser = () => {
    if (users.length > 0) {
      const nextIndex = (userIndex + 1) % users.length;
      setUserIndex(nextIndex);
      setUsername(users[nextIndex].login);
    }
  };

  const handleSaveCandidate = () => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    if (savedCandidates.includes(username)) {
      setAlertMessage('Candidate is already added to list.');
      setTimeout(() => setAlertMessage(''), 3000); // Clear the alert after 3 seconds
      return;
    }
    const updatedCandidates = [...savedCandidates, username];
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    setAlertMessage('✅ Candidate saved successfully!');
    setTimeout(() => setAlertMessage(''), 3000); // Clear the alert after 3 seconds
    console.log('Candidate saved:', {
      username,
      email,
      location,
      company,
      bio,
      avatar,
    });
  };

  const handleViewSavedCandidates = () => {
    navigate('/SavedCandidates');
  };

  useEffect(() => {
    fetchUsers();
    fetchFullName();
  }, []);

  return (
    <div>
      <h1>Candidate Search</h1>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '16px' }}>
        <button onClick={handleNextUser}>Next User</button>
        <button onClick={handleSaveCandidate}>Add</button>
        <button onClick={handleViewSavedCandidates}>View Saved Users</button>
      </div>

      {alertMessage && (
        <div style={{ marginTop: '16px', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
          {alertMessage}
        </div>
      )}

      <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '16px' }}>
        {avatar && <img src={avatar} alt="Avatar" style={{ width: '100px', borderRadius: '50%' }} />}
        <h3>Name:</h3>
        <p>{name}  | @{username}</p>
        <h3>Repositories:</h3>
        {reposUrl ? (
          <a href={reposUrl} target="_blank" rel="noopener noreferrer">
            View Repositories on GitHub
          </a>
        ) : (
          <p>Repositories not available</p>
        )}
        <h3>Location:</h3>
        <p>{location}</p>
        <h3>Email:</h3>
        <p>{email}</p>
        <h3>Company:</h3>
        <p>{company}</p>
        <h3>Bio:</h3>
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default CandidateSearch;







// Starter Code
// import { useState, useEffect } from 'react';
// import { searchGithub, searchGithubUser } from '../api/API';

// const CandidateSearch = () => {
//   return <h1>Candidate Search</h1>;
// };

// export default CandidateSearch;