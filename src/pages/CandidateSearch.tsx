import { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (username) {
      // Fetch user details from GitHub API
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        .then((user) => {
          setName(user.name || 'Name not available');
          setLocation(user.location || 'Location not available');
          setCompany(user.company || 'Company not available');
          setBio(user.bio || 'Bio not available');
          setAvatar(user.avatar_url || '');
          setReposUrl(user.html_url ? `${user.html_url}?tab=repositories` : '');

          // Fetch user email from GitHub API
          fetch(`https://api.github.com/user/emails`, {
            headers: {
              Authorization: `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`, // Replace with your GitHub token
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
    const updatedCandidates = [...savedCandidates, username];
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    console.log('Candidate saved:', {
      username,
      email,
      location,
      company,
      bio,
      avatar,
    });
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
        <button onClick={handleSaveCandidate}>Save Candidate</button>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '16px' }}>
        {avatar && <img src={avatar} alt="Avatar" style={{ width: '100px', borderRadius: '50%' }} />}
        <h2>Name:</h2>
        <p>{name}</p>
        <h2>Username:</h2>
        <p>{username}</p>
        <h2>Repositories:</h2>
        {reposUrl ? (
          <a href={reposUrl} target="_blank" rel="noopener noreferrer">
            View Repositories on GitHub
          </a>
        ) : (
          <p>Repositories not available</p>
        )}
        <h2>Location:</h2>
        <p>{location}</p>
        <h2>Email:</h2>
        <p>{email}</p>
        <h2>Company:</h2>
        <p>{company}</p>
        <h2>Bio:</h2>
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