// TODO: Create an interface for the Candidate objects returned by the API
export default interface Candidate {
    name: string;
    email: string;
    company: string;
    location: string;
    bio: string;
    avatar_url: string;
    repos_url: string;
}

// export default interface Candidate {
//     login: string;
//     avatar_url: string;
//     // location:;
//     // email:;
//     // company:;
//     // Bio:;
//     repos_url: string;
//     user_view_type: string;

// }