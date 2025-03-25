import { useEffect, useState } from "react";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    const fetchCandidates = async () => {
      const fetchedCandidates = await Promise.all(
        savedCandidates.map(async (username: string) => {
          const response = await fetch(`https://api.github.com/users/${username}`);
          return response.json();
        })
      );
      setCandidates(fetchedCandidates);
    };
    fetchCandidates();
  }, []);

  const removeCandidate = (username: string) => {
    const updatedCandidates = candidates.filter(candidate => candidate.login !== username);
    setCandidates(updatedCandidates);
    localStorage.setItem(
      "savedCandidates",
      JSON.stringify(updatedCandidates.map(candidate => candidate.login))
    );
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      {candidates.length === 0 ? (
        <p>No candidates to display.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={candidate.id || index}>
                <td>
                  <img src={candidate.avatar_url} alt={candidate.login} width="50" />
                </td>
                <td>
                  {candidate.name || "N/A"}
                  <br />
                  ({candidate.login || "N/A"})
                </td>
                <td>{candidate.location || "N/A"}</td>
                <td>{candidate.email || "N/A"}</td>
                <td>{candidate.company || "N/A"}</td>
                <td>{candidate.bio || "N/A"}</td>
                <td>
                  <button onClick={() => removeCandidate(candidate.login)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default SavedCandidates;
