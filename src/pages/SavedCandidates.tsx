import { useEffect, useState } from "react";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

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

  const sortCandidates = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedCandidates = [...candidates].sort((a, b) => {
      if (a[key] === null || a[key] === undefined) return 1;
      if (b[key] === null || b[key] === undefined) return -1;
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setCandidates(sortedCandidates);
  };

  const getSortIndicator = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
  };

  const filteredCandidates = candidates.filter(candidate => {
    return Object.keys(filters).every(key => {
      if (!filters[key]) return true;
      const candidateValue = candidate[key]?.toString().toLowerCase() || "";
      return candidateValue.includes(filters[key].toLowerCase());
    });
  });

  return (
    <>
      <h1>Potential Candidates</h1>
      {candidates.length === 0 ? (
        <p>No candidates to display.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Profile Image</th>
              <th>
                <div onClick={() => sortCandidates("name")}>
                  Name {getSortIndicator("name")}
                </div>
                <input
                  type="text"
                  placeholder="Filter by name"
                  value={filters.name || ""}
                  onChange={e => handleFilterChange("name", e.target.value)}
                />
              </th>
              <th>
                <div onClick={() => sortCandidates("location")}>
                  Location {getSortIndicator("location")}
                </div>
                <input
                  type="text"
                  placeholder="Filter by location"
                  value={filters.location || ""}
                  onChange={e => handleFilterChange("location", e.target.value)}
                />
              </th>
              <th>
                <div onClick={() => sortCandidates("email")}>
                  Email {getSortIndicator("email")}
                </div>
                <input
                  type="text"
                  placeholder="Filter by email"
                  value={filters.email || ""}
                  onChange={e => handleFilterChange("email", e.target.value)}
                />
              </th>
              <th>
                <div onClick={() => sortCandidates("company")}>
                  Company {getSortIndicator("company")}
                </div>
                <input
                  type="text"
                  placeholder="Filter by company"
                  value={filters.company || ""}
                  onChange={e => handleFilterChange("company", e.target.value)}
                />
              </th>
              <th>
                <div onClick={() => sortCandidates("bio")}>
                  Bio {getSortIndicator("bio")}
                </div>
                <input
                  type="text"
                  placeholder="Filter by bio"
                  value={filters.bio || ""}
                  onChange={e => handleFilterChange("bio", e.target.value)}
                />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate, index) => (
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

